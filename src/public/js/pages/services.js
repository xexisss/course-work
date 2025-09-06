document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/services-list')
      .then(res => res.json())
      .then(renderTable)
      .catch(err => console.error('Ошибка загрузки услуг:', err));
  });
  
  function renderTable(items) {
    const tbody = document.getElementById('services-body');
    tbody.innerHTML = '';
  
    items.forEach(({ service, type, percent }) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${service}</td>
        <td>${type}</td>
        <td>${percent}</td>
      `;
      tbody.append(tr);
    });
  }