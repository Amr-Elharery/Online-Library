const container = document.getElementById('main-container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});




document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('l-form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      var selectedRole = document.getElementById('user_role_Login').value;

      if (selectedRole === 'USER') {
          window.location.href = '../user/user-home/user-home.html'; 
      } else if (selectedRole === 'ADMIN') {
          window.location.href = '../admin/admin-home/admin-home.html';
      }
  });
});




document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "../login&signup/login&signup.html";
  });



var currentPageUrl = window.location.href;





let menu = document.getElementById('menu-icon');
let nav = document.getElementById('toggle-nav');

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

