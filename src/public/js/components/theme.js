const htmlEl = document.documentElement;
const btn = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
}

btn.addEventListener('click', () => {
    const newTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});