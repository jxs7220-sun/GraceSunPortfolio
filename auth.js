/* Public browser configuration. No secret or service-role key is used. */
(() => {
  'use strict';
  const isLogin = document.getElementById('auth-form') !== null;
  const home = 'index.html';
  const login = 'login.html';
  let client;
  function message(text) {
    const status = document.getElementById('auth-status');
    if (status) status.textContent = text;
  }
  function redirectToLogin() {
    document.documentElement.classList.add('auth-pending');
    window.location.replace(login);
  }
  try {
    client = window.supabase.createClient(
      'https://phiglohblaifrdezmyur.supabase.co',
      'sb_publishable__uacI2FtSFdv8q-DBwuu3w_SXR-jz1m'
    );
  } catch (_) {
    if (isLogin) message('Unable to load login. Check your connection and reload this page.');
    else redirectToLogin();
    return;
  }

  // The callback stays synchronous: Supabase auth calls run outside it.
  client.auth.onAuthStateChange((event, session) => {
    if (!isLogin && event === 'SIGNED_OUT') redirectToLogin();
    if (isLogin && event === 'SIGNED_IN' && session) window.location.replace(home);
  });

  async function start() {
    try {
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      if (!isLogin) {
        if (!data.session) return redirectToLogin();
        // Validate the stored session against Supabase before displaying the page.
        const result = await client.auth.getUser();
        if (result.error || !result.data.user) return redirectToLogin();
        document.documentElement.classList.remove('auth-pending');
        document.querySelectorAll('[data-logout]').forEach(button => {
          button.addEventListener('click', async () => {
            button.disabled = true;
            button.textContent = 'Logging out…';
            try {
              const { error } = await client.auth.signOut({ scope: 'local' });
              if (error) throw error;
              redirectToLogin();
            } catch (_) {
              button.disabled = false;
              button.textContent = 'Log Out';
              window.alert('Unable to log out. Check your connection and try again.');
            }
          });
        });
        return;
      }
      // login.html remains public, including when an existing session is present.
      setupForm();
    } catch (_) {
      if (isLogin) message('Unable to connect. Check your connection and reload this page.');
      else redirectToLogin();
    }
  }

  function setupForm() {
    const form = document.getElementById('auth-form');
    const submit = document.getElementById('submit-auth');
    const toggle = document.getElementById('toggle-auth');
    const password = document.getElementById('password');
    let signup = false;
    submit.disabled = toggle.disabled = false;
    message('');
    toggle.addEventListener('click', () => {
      signup = !signup;
      submit.textContent = signup ? 'Sign Up' : 'Log In';
      toggle.textContent = signup ? 'Already have an account? Log In' : 'New here? Sign Up';
      password.autocomplete = signup ? 'new-password' : 'current-password';
      message(signup ? 'Create an account with your email and password.' : '');
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      submit.disabled = toggle.disabled = true;
      message(signup ? 'Creating your account…' : 'Logging in…');
      const credentials = {
        email: form.elements.email.value.trim(),
        password: password.value
      };
      try {
        const result = signup
          ? await client.auth.signUp({ ...credentials, options: {
              emailRedirectTo: new URL(login, window.location.href).href
            } })
          : await client.auth.signInWithPassword(credentials);
        if (result.error) throw result.error;
        if (result.data.session) {
          password.value = '';
          window.location.replace(home);
          return;
        }
        message('Check your email for a confirmation link, then return here to log in.');
        password.value = '';
      } catch (error) {
        message(error.message || 'Unable to authenticate. Please try again.');
      } finally {
        submit.disabled = toggle.disabled = false;
      }
    });
  }
  // Re-check sessions when restoring a page from the browser back/forward cache.
  window.addEventListener('pageshow', event => {
    if (!isLogin && event.persisted) {
      document.documentElement.classList.add('auth-pending');
      window.location.reload();
    }
  });
  start();
})();