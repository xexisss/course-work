const form = document.getElementById('loginForm');
const msg = document.getElementById('loginMessage');

form.addEventListener('submit', async e => {
    e.preventDefault();
    msg.textContent = '';

    const nickname = form.nickname.value.trim();
    const password = form.password.value;

    if (!nickname || !password) {
        msg.textContent = 'Enter your nickname and password';
        return;
    }

    try {
        const query = `users?${nickname.includes('@') ? 'email' : 'nickname'}=${encodeURIComponent(nickname)}&password=${encodeURIComponent(password)}`;
        const res = await fetch(`http://localhost:3000/${query}`);
        if(!res.ok) throw new Error(res.statusText);

        const users = await res.json();
        if(users.length === 0) {
            msg.textContent = 'Incorrect login or password';
        }

        const user = users[0];
        localStorage.setItem('currentUser', JSON.stringify({
            id:     user.id,
            name:   user.name || user.nickname,
        }));

        window.location.href = 'profile.html';
    }
    catch (err) {
        console.error(err);
        msg.textContent = 'Authorization error';
    }
});