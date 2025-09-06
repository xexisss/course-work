document.addEventListener('DOMContentLoaded', () => {
    const current = JSON.parse(localStorage.getItem('currentUser'));
    if (!current) {
        window.location.href = 'login.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('serviceId');
    if (!serviceId) {
        document.getElementById('message').textContent = 'Ошибка: не указан serviceId';
        return;
    }

    document.getElementById('serviceId').value = serviceId;

    fetch(`http://localhost:3000/services-list/${serviceId}`).then(res => {
            if (!res.ok) throw new Error('Сервис не найден');
            return res.json();
        })
        .then(service => {
            document.getElementById('service-title').textContent = `Заказ: ${service.service}`;
        })
        .catch(err => {

            document.getElementById('message').textContent = err.message;
        });

    document.getElementById('order-form')
        .addEventListener('submit', event => {
            event.preventDefault();
            const order = {
                serviceId: Number(serviceId),
                userId: current.id
            };

            fetch('http://localhost:3000/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                .then(res => {
                    if (!res.ok) throw new Error('Ошибка сервера при создании заказа');
                    return res.json();
                })
                .then(result => {
                    document.getElementById('message').textContent =
                        `Спасибо, ${current.nickname}! Ваш заказ #${result.id} принят.`;
                })
                .catch(err => {
                    alert(1);
                    document.getElementById('message').textContent = err.message;
                });
        });
});