const themeToggle = document.querySelector('.theme-toggle');

themeToggle?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  localStorage.setItem('design-contract-theme', dark ? 'dark' : 'light');
});

const storedTheme = localStorage.getItem('design-contract-theme');
if (storedTheme) document.documentElement.dataset.theme = storedTheme;
