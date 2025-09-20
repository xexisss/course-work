const form = document.getElementById('registerForm');
const msg = document.getElementById('message');

form.addEventListener('submit', async e => {
    e.preventDefault();
    msg.textContent = '';

    const user = {
        surname:    form.surname.value.trim(),
        name:       form.name.value.trim(),
        patronymic: form.patronymic.value.trim(),
        birthdate:  form.birthdate.value.trim(),
        phone:      form.phone.value.trim(),
        email:      form.email.value.trim(),
        nickname:   form.nickname.value.trim(),
        password:   form.password.value,
        passwordRepeat: form.password.value
    };

    if (!user.surname || !user.name || !user.birthdate || !user.phone || !user.email
        || !user.nickname || !user.password) {
        msg.textContent = 'Please fill in the required fields';
        return;
    }

    if (user.password !== user.passwordRepeat) {
        msg.textContent = 'The passwords do not match';
        return;
    }

    const nameRegex  = /^[А-Яа-яЁё\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+375\d{9}$/;

    if (!nameRegex.test(user.surname) || !nameRegex.test(user.name)) {
        msg.textContent = 'Registration error';
        return;    
    }
    if (!emailRegex.test(user.email)) {
        msg.textContent = 'Registration error';
        return;    
    }
    if (!phoneRegex.test(user.phone)) {
        msg.textContent = 'Registration error';
        return;    
    }

    try {
        let res = await fetch(`http://localhost:3000/users?nickname=${user.nickname}`);
        let exists = await res.json();
        if(exists.length) {
            msg.textContent = 'The nickname is already taken';
            return
        }
        
        delete user.passwordRepeat;
        res = await fetch('http://localhost:3000/users', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(user)
        });

        if(!res.ok) throw new Error(res.statusText);

        msg.style.color = 'green';
        msg.textContent   = 'Регистрация прошла успешно!';
        form.reset();
    }   
    catch (err) {
        console.error(err);
        msg.textContent = 'Registration error';
    }
});