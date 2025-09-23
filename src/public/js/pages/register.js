const form = document.getElementById('registerForm');
const msg = document.getElementById('message');
const dobInput   = document.getElementById('phone');

const today      = new Date();
const yyyy       = today.getFullYear();
const mm         = String(today.getMonth() + 1).padStart(2, '0');
const dd         = String(today.getDate()).padStart(2, '0');

const maxDate    = `${yyyy}-${mm}-${dd}`;
const minDate    = `${yyyy - 120}-${mm}-${dd}`;

dobInput.setAttribute('max', maxDate);
dobInput.setAttribute('min', minDate);

function calculateAge(birth, today) {
    let age = today.getFullYear() - birth.getFullYear();
    const m  = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
}

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
        msg.style.color = 'red';
        msg.textContent = 'Пожалуйста, заполните обязательные поля(*)';
        return;
    }

    if (user.password !== user.passwordRepeat) {
        msg.style.color = 'red';
        msg.textContent = 'Пароли не совпадают';
        return;
    }

    const birthdate = new Date(user.birthdate);
    const age = calculateAge(birthdate, today);

    if (age < 18) {
        msg.style.color = 'red';
        msg.textContent = 'Вам должно быть не менее 18 лет';
        return;
    }
    if (age > 120) {
        msg.style.color = 'red';
        msg.textContent = 'Проверьте, правильно ли указана дата.';
        return;
    }

    const nameRegex  = /^[А-Яа-яЁё\s\-]+$/;
    const nameRegex2  = /^[A-Za-z\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+375\d{9}$/;

    if (!nameRegex.test(user.surname) || !nameRegex.test(user.name) || nameRegex2.test(user.surname) || nameRegex2.test(user.surname)) {
        msg.style.color = 'red';
        msg.textContent = 'Имя и фамилия должны состоять только из символов';
        return;    
    }
    if (!emailRegex.test(user.email)) {
        msg.style.color = 'red';
        msg.textContent = 'Неверный E-mail';
        return;    
    }
    if (!phoneRegex.test(user.phone)) {
        msg.style.color = 'red';
        msg.textContent = 'Неверный номер телефона';
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