// Tailwind CDN configuration: use class-based dark mode
// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
// Must be defined before loading the CDN script
tailwind = window.tailwind || {};
tailwind.config = { darkMode: 'class' };
