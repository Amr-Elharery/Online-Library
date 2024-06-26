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

let bookDetails = document.getElementById('book-details');

function renderBook() {
  bookDetails.innerHTML = '';
  let bookDiv = document.createElement('div');
  bookDiv.classList.add('book-div');
  bookDiv.innerHTML = `
    <div id="${book.id}">
      <br />
      <div class="name-author-category">
        <p id="name"> <b>Name:</b> <b id="nm"> ${book.name}</b></p>
        <p id="author"><b>Author: </b> ${book.author}</p>
        <p id="category"><b>Category: </b> ${book.category}</p>
      </div>
      <br />
      <b>Description:</b>
      <div class="description">
        <p>
          ${book.description}
        </p>
      </div>
      <br />
    </div>
  `;
  bookDetails.appendChild(bookDiv);
}
renderBook();

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user');
});
