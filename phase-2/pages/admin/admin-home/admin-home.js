let booksHolder = document.getElementById('booksHolder');
let adminBooks = JSON.parse(localStorage.getItem('books')) || [];

function renderBooks() {
  booksHolder.innerHTML = '';
  adminBooks.forEach((book) => {
    let bookHolder = document.createElement('div');
    bookHolder.classList.add('book');
    bookHolder.innerHTML = `
    <div class="book-img">
              <img src="../.././../media/books/${book.image}" alt="Book" />
            </div>
            <div class="book-info">
              <div class="book-title">Title: ${book.name}</div>
              <div class="book-author">Author: ${book.author}</div>
              <div class="book-category">Category: ${book.category}</div>
              <div class="buttons">
                <button id="editBook" class="btn-shape btn-effect" onclick="handleEditBook(${book})">
                  <a href="../edit-book/edit-book.html">Edit</a>
                </button>
                <button id="deleteBook" class="btn-shape btn-effect" onclick="handleDeleteBook(${book.id})">
                  Delete
                </button>
              </div>
            </div>
    `;
    booksHolder.appendChild(bookHolder);
  });
}

renderBooks();
function handleDeleteBook(id) {
  let index = adminBooks.findIndex((book) => book.id === id);
  adminBooks.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(adminBooks));
  renderBooks();
}

function handleEditBook(book) {
  sessionStorage.setItem('editedBook', book);
  handleDeleteBook(book);
}
