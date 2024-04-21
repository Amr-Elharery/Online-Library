// Toggling navbar in mobile
let menu = document.getElementById('menu-icon');
let nav = document.getElementById('toogle-nav');
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

let adminBooks = JSON.parse(localStorage.getItem('books'));

// Target book id
let id = +new URLSearchParams(window.location.search).get('id');

// Get book
let book = adminBooks.find((b) => b.id === id);

function renderBook() {}
