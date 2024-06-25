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
      let logEmail = document.getElementById('logEmail');
      // if (logPassword.value.length < 8) {
      //   Swal.fire({
      //     title: 'Error!',
      //     text: 'Password less than 8!',
      //     icon: 'error',
      //   });
      //   return;
      // }

      login(logEmail.value, logPassword.value);
    });
});

function login(email, password) {
  let _url = 'http://127.0.0.1:8000/users/login/';
  let user = {
    email,
    password,
  };
  fetch(_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          console.error('Error response:', err);
          throw new Error(err.message || 'Login failed!');
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.body));
      if (data.body.is_staff) {
        window.location.href = '../admin/admin-home/admin-home.html';
      } else if (!data.body.is_staff) {
        window.location.href = '../user/user-home/user-home.html';
      }
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'Login failed!',
        icon: 'error',
      });
    });
}

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
