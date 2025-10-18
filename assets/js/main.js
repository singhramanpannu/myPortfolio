(function () {
  const toggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const navLinks = Array.from(
    document.querySelectorAll('nav a[data-nav], #mobile-menu a[data-nav]')
  );

  const updateIcons = () => {
    const isDark = document.documentElement.classList.contains('dark');
    // Show sun when in dark mode (tap sun -> go light)
    iconSun.classList.toggle('hidden', !isDark);
    // Show moon when in light mode (tap moon -> go dark)
    iconMoon.classList.toggle('hidden', isDark);
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  };

  const setTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {}
    updateIcons();
  };

  if (toggle) {
    toggle.addEventListener('click', () =>
      setTheme(!document.documentElement.classList.contains('dark'))
    );
  }

  try {
    const stored = localStorage.getItem('theme');
    if (!stored) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => setTheme(e.matches));
    }
  } catch (e) {}

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  updateIcons();

  // Active link highlighting (scrollspy)
  const sections = ['about', 'projects', 'skills', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const id = entry.target.id;
              const link = navLinks.find(
                (a) => a.getAttribute('data-nav') === id
              );
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
