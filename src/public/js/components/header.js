const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
    window.location.href = '../login.html';
});

const accessibilityToggle = document.getElementById('accessibilityToggle');
const body   = document.body;

document.addEventListener('DOMContentLoaded', () => {
  const isOn = localStorage.getItem('accessible') === 'true';
  setMode(isOn);
});

accessibilityToggle.addEventListener('click', () => {
  const isOn = body.classList.toggle('accessible');
  setMode(isOn);
});

function setMode(on) {
    if (on) {
        body.classList.add('accessible');
        accessibilityToggle.setAttribute('aria-pressed', 'true');
        accessibilityToggle.textContent = '👁';
    } else {
        body.classList.remove('accessible');
        accessibilityToggle.setAttribute('aria-pressed', 'false');
        accessibilityToggle.textContent = '👁';
    } 
    localStorage.setItem('accessible', on);
}
