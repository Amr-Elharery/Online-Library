document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

var selectedRole = document.getElementById('user_role').value;


if (selectedRole === 'user') {
    window.location.href = '../user/user-home/user-home.html';
} else if (selectedRole === 'admin') {
    window.location.href = '../admin/admin-home/admin-home.html';
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



let menu = document.getElementById('menu-icon');
let nav = document.getElementById('toogle-nav');

// Toggling navbar in mobile
menu.addEventListener('click', () => {
  if (nav.style.left != '0px') {
    nav.style.display = 'flex';
    setTimeout(() => {
      nav.style.left = '0px';
      nav.style.opacity = '1';
    }, 100);
  } else {
    nav.style.left = '100%';
    nav.style.opacity = '0';
    setTimeout(() => {
      nav.style.display = 'none';
    }, 100);
  }
});