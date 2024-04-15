document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

var selectedRole = document.getElementById('user_role').value;


if (selectedRole === 'user') {
    window.location.href = '../user/user-home.html';
} else if (selectedRole === 'admin') {
    window.location.href = '../admin/admin-home.html';
}
});




var currentPageUrl = window.location.href;


function highlightActiveLink() {
var links = document.querySelectorAll('nav a');

links.forEach(function(link) {

if (link.href === currentPageUrl) {
    link.classList.add('active'); 
}
});
}

highlightActiveLink();