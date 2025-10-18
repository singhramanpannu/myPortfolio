// main.js
(function () {
  // All theme toggle buttons (desktop + mobile)
  const toggles = Array.from(document.querySelectorAll('.theme-toggle'));

  const updateIcons = () => {
    const isDark = document.documentElement.classList.contains('dark');
    toggles.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (sun && moon) {
        sun.classList.toggle('hidden', !isDark);
        moon.classList.toggle('hidden', isDark);
      }
    });
  };

  const setTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {}
    updateIcons();
  };

  // Add listeners to all theme toggle buttons
  toggles.forEach((btn) =>
    btn.addEventListener('click', () =>
      setTheme(!document.documentElement.classList.contains('dark'))
    )
  );

  // Initialize based on saved preference or system preference
  try {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark);
      // listen for changes in system setting
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => setTheme(e.matches));
    }
  } catch (e) {
    // Fail silently
  }

  // Year footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  updateIcons();

  // Active link highlighting (scrollspy)
  const navLinks = Array.from(
    document.querySelectorAll('nav a[data-nav], #mobile-menu a[data-nav]')
  );

  const sections = ['about', 'projects', 'skills', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const id = entry.target.id;
              const link = navLinks.find((a) => a.getAttribute('data-nav') === id);
              if (!link) return;
              if (entry.isIntersecting) {
                navLinks.forEach((a) =>
                  a.classList.remove('bg-slate-100', 'dark:bg-slate-800')
                );
                link.classList.add('bg-slate-100', 'dark:bg-slate-800');
              }
            });
          },
          {
            rootMargin: '-40% 0px -55% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1],
          }
        )
      : null;

  if (observer) sections.forEach((sec) => observer.observe(sec));
})();