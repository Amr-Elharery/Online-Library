var currentPageUrl = window.location.href;

function highlightActiveLink() {
  var links = document.querySelectorAll('nav a');

  links.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add('active');
    }
  });
}

highlightActiveLink();

let booksHolder = document.getElementById('booksHolder');

async function getBooks() {
  let _url = 'http://localhost:8000/books/';
  try {
    let res = await fetch(_url);
    if (!res.ok) {
      let err = await res.json();
      throw new Error(err.message || 'Error fetching books');
    }
    let data = await res.json();
    return data.body;
  } catch (err) {
    Swal.fire({
      title: 'Error!',
      text: err.message,
      icon: 'error',
    });
    return [];
  }
}

getBooks().then((books) => {
  adminBooks = books;
  renderBooks(adminBooks);
});

function renderBooks(books) {
  booksHolder.innerHTML = '';
  if (books.length > 0) {
    books.forEach((book) => {
      let bookHolder = document.createElement('div');
      bookHolder.classList.add('book');
      bookHolder.innerHTML = `
               <div class="book-img">
                <img src=
                     ${`http://localhost:8000//${book.image}`}
                 alt="Book" />
              </div>
              <div class="book-info flex flex-col">
                <div class="book-title">Title: ${book.name}</div>
                <div class="book-author">Author: ${book.author}</div>
                <div class="book-category">Category: ${book.category}</div>
                <div class="buttons flex flex-between">
                  <button id="editBook" class="btn-shape btn-effect"  onclick="handleEditBookAPI(${
                    book.id
                  })">
                    <a href="../edit-book/edit-book.html">Edit</a>
                  </button>
  
                  <button class="btn-shape btn-effect ${
                    book.available ? '' : 'notAvailable'
                  }">${book.available ? 'Available' : 'Not Available'}</button>
                  
                  <button id="deleteBook" class="btn-shape btn-effect" onclick="handleDeleteBookAPI(${
                    book.id
                  })">
                    Delete
                  </button>
                </div>
              </div>
      `;
      booksHolder.appendChild(bookHolder);
    });
  } else {
    booksHolder.innerHTML = '<div class="no-books">No books found</div>';
  }
}

function handleDeleteBookAPI(id) {
  let _url = `http://localhost:8000/books/${id}/`;
  fetch(_url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        let err = res.json();
        throw new Error(err.message || 'Error deleting book');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      Swal.fire({
        title: 'Successfully deleted!',
        text: 'You deleted the book!',
        icon: 'success',
      });
      getBooks().then((books) => {
        adminBooks = books;
        renderBooks(adminBooks);
        console.log(adminBooks);
      });
    })
    .catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
      });
    });
}

function handleEditBookAPI(id) {
  let bookDetails = adminBooks.find((book) => book.id === id);
  sessionStorage.setItem('editedBook', JSON.stringify(bookDetails));
}

// Handle search
let searchInput = document.getElementById('searchBar');
let searchBtn = document.getElementById('searchBtn');
function searchBooks() {
  let searchValue = searchInput.value.toLowerCase();
  let filteredBooks = adminBooks.filter((book) => {
    return (
      book.name.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue)
    );
  });
  renderBooks(filteredBooks);
}

searchBtn.addEventListener('click', searchBooks);
searchInput.addEventListener('keyup', searchBooks);

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user');
});
