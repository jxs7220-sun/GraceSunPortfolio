/* Restore project deep links after the existing authentication gate reveals content. */
(() => {
  const match = /^#project-0[123]$/.exec(location.hash);
  if (!match) return;
  const target = document.getElementById(match[0].slice(1));
  if (!target) return;
  async function revealTarget() {
    const images = [...document.querySelectorAll('.portfolio-group img')].filter(image =>
      target.contains(image) || (image.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)
    );
    await Promise.all(images.map(image => {
      image.loading = 'eager';
      return image.decode().catch(() => {});
    }));
    if (location.hash === match[0]) target.scrollIntoView({behavior: 'instant', block: 'start'});
  }
  if (!document.documentElement.classList.contains('auth-pending')) revealTarget();
  else {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('auth-pending')) return;
      observer.disconnect();
      revealTarget();
    });
    observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
  }
})();