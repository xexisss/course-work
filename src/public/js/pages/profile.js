document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('currentUser');
    if(!stored) {
        window.location.href = 'login.html';
        return;
    }

    const { id } = JSON.parse(stored);

    fetch(`http://localhost:3000/users/${id}`).then(res => {
        if (!res.ok) {
            throw new Error('Пользователь не найден');
        }
        return res.json();
    }).then(user => {
        document.getElementById('profile-name').textContent      = user.name || '—';
        document.getElementById('profile-nickname').textContent  = user.nickname;
        document.getElementById('profile-email').textContent     = user.email || '—';
        document.getElementById('profile-phone').textContent     = user.phone || '—';
    }).catch(err => {
        console.error(err);
        window.location.href = 'login.html';
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});