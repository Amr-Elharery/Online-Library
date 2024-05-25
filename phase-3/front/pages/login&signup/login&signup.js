var currentPageUrl = window.location.href;
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

function highlightActiveLink() {
  var links = document.querySelectorAll('nav a');

  links.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add('active');
    }
  });
}

highlightActiveLink();

const container = document.getElementById('main-container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// Log in
document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('l-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      let logPassword = document.getElementById('logPassword');
      var selectedRole = document.getElementById('user_role_Login').value;
      if(logPassword.value.length < 8){
        Swal.fire({
          title: 'Error!',
          text: 'Password less than 8!',
          icon: 'error',
        });
        return;
      }
      if (selectedRole === 'USER') {
        window.location.href = '../user/user-home/user-home.html';
      } else if (selectedRole === 'ADMIN') {
        window.location.href = '../admin/admin-home/admin-home.html';
      }
    });
});

// Sign up
document
  .getElementById('signup-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    if (validate()) {
      Swal.fire({
        title: 'Great!',
        text: 'You Signed up successfully!',
        icon: 'success',
      });
      window.location.href = '../login&signup/login&signup.html';
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Password less than 8 or doesnot match!',
        icon: 'error',
      });
    }
  });

function validate() {
  let password = document.getElementById('signupPassword');
  let confirmPassword = document.getElementById('signupConfirmPassword');
  if (password.value.length < 8) {
    return false;
  }
  if (password.value === '' || confirmPassword.value === '') {
    return false;
  }
  if (password.value !== confirmPassword.value) {
    return false;
  }

  return true;
}
