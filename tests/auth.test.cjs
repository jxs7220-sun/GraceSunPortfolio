const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('auth.js', 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));
async function run(options = {}) {
  const elements = {};
  for (const id of ['auth-form','submit-auth','toggle-auth','password','auth-status']) {
    elements[id] = {disabled: true, value: 'test-password', textContent: '', listeners: {},
      addEventListener(name, cb) {this.listeners[name] = cb;}};
  }
  elements['auth-form'].elements = {email: {value:' visitor@example.com '}};
  const redirects = [], classes = new Set(['auth-pending']), calls = [], button = {
    listeners:{},addEventListener(n,cb){this.listeners[n]=cb;}
  };
  let callback;
  const auth = {
    onAuthStateChange(cb){callback=cb;},
    async getSession(){return {data:{session: options.session || null},error:options.sessionError};},
    async getUser(){return {data:{user:options.invalidUser ? null : {id:'test'}},error:null};},
    async signInWithPassword(c){calls.push(['login',c]);return options.result || {data:{session:{user:{}}},error:null};},
    async signUp(c){calls.push(['signup',c]);return options.result || {data:{session:{user:{}}},error:null};},
    async signOut(c){calls.push(['logout',c]);return {error:options.logoutError || null};}
  };
  const window = {supabase: options.noSdk ? undefined : {createClient:()=>({auth})},
    location:{href:'http://localhost/login.html',replace:p=>redirects.push(p),reload(){}},
    addEventListener(){},alert:()=>calls.push(['alert'])};
  const document={getElementById:id=>(options.login ? elements[id] : null),
    documentElement:{classList:{add:c=>classes.add(c),remove:c=>classes.delete(c)}},
    querySelectorAll:()=>[button]};
  vm.runInNewContext(source,{window,document,URL});
  await tick();
  return {elements,redirects,classes,calls,button,event:(...a)=>callback(...a)};
}
test('signed-out visitor redirects before protected content is shown',async()=>{const r=await run();assert.deepEqual(r.redirects,['login.html']);assert.ok(r.classes.has('auth-pending'));});
test('validated session reveals protected page',async()=>{const r=await run({session:{}});assert.equal(r.redirects.length,0);assert.equal(r.classes.has('auth-pending'),false);});
test('invalid stored session stays gated',async()=>{const r=await run({session:{},invalidUser:true});assert.deepEqual(r.redirects,['login.html']);});
test('CDN failure cannot reveal protected content',async()=>{const r=await run({noSdk:true});assert.deepEqual(r.redirects,['login.html']);});
test('login redirects home with trimmed email and unchanged password',async()=>{const r=await run({login:true});await r.elements['auth-form'].listeners.submit({preventDefault(){}});assert.deepEqual(r.redirects,['index.html']);assert.equal(r.calls[0][1].email,'visitor@example.com');assert.equal(r.calls[0][1].password,'test-password');});
test('authenticated signup redirects home',async()=>{const r=await run({login:true});r.elements['toggle-auth'].listeners.click();await r.elements['auth-form'].listeners.submit({preventDefault(){}});assert.equal(r.calls[0][0],'signup');assert.deepEqual(r.redirects,['index.html']);});
test('signup requiring confirmation stays public with instructions',async()=>{const r=await run({login:true,result:{data:{session:null},error:null}});r.elements['toggle-auth'].listeners.click();await r.elements['auth-form'].listeners.submit({preventDefault(){}});assert.equal(r.redirects.length,0);assert.match(r.elements['auth-status'].textContent,/Check your email/);});
test('auth errors are visible and form can retry',async()=>{const r=await run({login:true,result:{error:{message:'Invalid login credentials'}}});await r.elements['auth-form'].listeners.submit({preventDefault(){}});assert.equal(r.elements['submit-auth'].disabled,false);assert.equal(r.elements['auth-status'].textContent,'Invalid login credentials');});
test('logout clears session and returns to login',async()=>{const r=await run({session:{}});await r.button.listeners.click();assert.equal(r.calls[0][0],'logout');assert.deepEqual(r.redirects,['login.html']);});
test('cross-tab signed-out event hides content and redirects',async()=>{const r=await run({session:{}});r.event('SIGNED_OUT',null);assert.ok(r.classes.has('auth-pending'));assert.deepEqual(r.redirects,['login.html']);});
test('all portfolio pages load CDN and guard, login is public',()=>{for(const f of ['index.html','about.html','projects.html','contact.html']){const html=fs.readFileSync(f,'utf8');assert.match(html,/class="auth-pending"/);assert.match(html,/data-logout/);assert.match(html,/supabase-js@2/);assert.match(html,/src="auth.js"/);assert.doesNotMatch(html,/button disabled/);}assert.doesNotMatch(fs.readFileSync('login.html','utf8'),/class="auth-pending"/);});