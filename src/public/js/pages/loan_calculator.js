document.addEventListener('DOMContentLoaded', () => {
    const planSelect = document.getElementById('plan');
    const form = document.getElementById('loan-form');
    const resultDiv = document.getElementById('result');

    fetch('http://localhost:3000/services-list?type=loan')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(plans => {
            planSelect.innerHTML = '<option value="">-- Choose plan --</option>';
            plans.forEach(plan => {
                const opt = document.createElement('option');
                opt.value = plan.id;
                opt.textContent = `${plan.service} — ${Math.round(plan.percent * 100)}% годовых`;
                opt.dataset.rate = plan.percent;
                planSelect.append(opt);
            });
        })
        .catch(err => {
            planSelect.innerHTML = '<option value="">Не удалось загрузить планы</option>';
            console.error(err);
        });

    form.addEventListener('submit', e => {
        e.preventDefault();
        resultDiv.textContent = '';

        const amount = parseFloat(form.amount.value);
        const term = parseInt(form.term.value, 10);
        const selOpt = planSelect.selectedOptions[0];

        if (!selOpt || !selOpt.value) {
            resultDiv.textContent = 'Пожалуйста, выберите план';
            return;
        }

        const annualRate = parseFloat(selOpt.dataset.rate);
        const monthlyRate = annualRate / 12;
        const n = term;

        const payment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));

        if (isNaN(payment) || !isFinite(payment)) {
            resultDiv.textContent = 'Ошибка расчёта. Проверьте ввод.';
        } else {
            resultDiv.innerHTML = `
          <p>Ежемесячный платёж: <strong>${payment.toFixed(2)} ₽</strong></p>
          <p>Всего выплат: <strong>${(payment * n).toFixed(2)} ₽</strong></p>
        `;
        }
    });
});