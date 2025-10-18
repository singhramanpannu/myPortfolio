// ui.js
(function () {
  // Projects dropdown (desktop)
  const trigger = document.getElementById('projects-trigger');
  const menu = document.getElementById('projects-menu');
  let open = false;
  const setOpen = (v) => {
    open = v;
    if (!trigger || !menu) return;
    trigger.setAttribute('aria-expanded', String(v));
    menu.classList.toggle('hidden', !v);
    // move focus into menu when opened for keyboard users
    if (v) {
      const first = menu.querySelector('a, button, [tabindex]');
      if (first) first.focus();
    } else {
      trigger.focus();
    }
  };

  if (trigger && menu) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!open);
    });

    // Close if click outside
    document.addEventListener('click', (e) => {
      if (!open) return;
      if (!menu.contains(e.target) && e.target !== trigger) setOpen(false);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Mobile menu
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');
  const setMobileOpen = (v) => {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.classList.toggle('hidden', !v);
    mobileToggle.setAttribute('aria-expanded', String(v));
    document.body.classList.toggle('overflow-hidden', v);
    if (v) {
      const first = mobileMenu.querySelector('a, button, [tabindex]');
      if (first) first.focus();
    } else {
      mobileToggle.focus();
    }
  };

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () =>
      setMobileOpen(mobileMenu.classList.contains('hidden'))
    );
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => setMobileOpen(false));
  }

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      setMobileOpen(false);
    }
  });
})();