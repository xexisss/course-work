const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (!currentUser) {
    window.location.href = 'login.html';
} else {
    //document.body.insertAdjacentHTML('afterbegin', `<p>Привет, ${currentUser.name}!</p>`);
}