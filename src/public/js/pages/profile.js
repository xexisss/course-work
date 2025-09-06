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
        
        if(user.id === "1") {
            fetch('/users').then(res => res.json()).then(users => {
                let ul = document.createElement('ul');
                users.forEach(u => {
                    const li = document.createElement('li');
                    li.textContent = `${u.id}: ${u.nickname} (${u.email})`;
                    ul.append(li);
                });
                document.getElementById('container').append(ul);
            });
        }
    }).catch(err => {
        console.error(err);
        window.location.href = 'login.html';
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});

const passwordForm     = document.getElementById('passwordForm');
const currentInput     = document.getElementById('password-old');
const newInput         = document.getElementById('password-new');
const confirmInput     = document.getElementById('password-repeat');
const passwordMessage  = document.getElementById('passwordMessage');

passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    passwordMessage.textContent = '';

    const current = currentInput.value.trim();
    const next = newInput.value.trim();
    const confirm = confirmInput.value.trim();

    if (next != confirm) {
        passwordMessage.textContent = 'New password and confirmation do not match';
    }

    try {
        const { id } = JSON.parse(localStorage.getItem('currentUser'));

        const resUser = await fetch(`http://localhost:3000/users/${id}`);
        const user = await resUser.json();

        if (current !== user.password) {
            passwordMessage.textContent = 'The current password is incorrect.';
            return;
        }

        const resPatch = await fetch(`http://localhost:3000/users/${id}`, {
            method:  'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ password: next })
        });

        if (!resPatch.ok) throw new Error('Error updating password');

        passwordMessage.style.color = 'green';
        passwordMessage.textContent = 'Password successfully changed';
        passwordForm.reset();
    } catch (err) {
        passwordMessage.style.color = 'red';
        passwordMessage.textContent = 'Failed to change password. Please try again.';
        console.error(err);
    }
});