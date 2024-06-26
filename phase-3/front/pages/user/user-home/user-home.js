"use strict";
var currentPageUrl = window.location.href;

function highlightActiveLink() {
  var links = document.querySelectorAll("nav a");

  links.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add("active");
    }
  });
}

highlightActiveLink();

let menu = document.getElementById("menu-icon");
let nav = document.getElementById("toogle-nav");

// Toggling navbar in mobile
menu.addEventListener("click", () => {
  if (nav.style.left != "0px") {
    nav.style.display = "flex";
    setTimeout(() => {
      nav.style.left = "0px";
      nav.style.opacity = "1";
    }, 100);
  } else {
    nav.style.left = "100%";
    nav.style.opacity = "0";
    setTimeout(() => {
      nav.style.display = "none";
    }, 100);
  }
});

let booksHolder = document.getElementById("booksHolder");

let adminBooks = [];
let borrowedBooks = [];

if (localStorage.getItem("borrowedBooks")) {
  borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")).userBooks;
} else {
  localStorage.setItem(
    "borrowedBooks",
    JSON.stringify({
      userID: JSON.parse(localStorage.getItem("user")).id,
      userBooks: [],
    })
  );
}

async function getBooks() {
  let _url = "http://localhost:8000/books/";
  try {
    let res = await fetch(_url);
    if (!res.ok) {
      let err = await res.json();
      throw new Error(err.message || "Error fetching books");
    }
    let data = await res.json();
    return data.body;
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: err.message,
      icon: "error",
    });
    return [];
  }
}

getBooks().then((books) => {
  adminBooks = books;
  renderBooks(adminBooks);
});

function renderBooks(books) {
  booksHolder.innerHTML = "";
  if (books.length > 0) {
    books.forEach((book) => {
      let bookHolder = document.createElement("div");
      bookHolder.classList.add("book");
      bookHolder.innerHTML = `
             <div class="book-img">
              <img src=${`http://localhost:8000//${book.image}`} alt="Book" />
            </div>
            <div class="book-info flex flex-col">
              <div class="book-title">Title: ${book.name}</div>
              <div class="book-author">Author: ${book.author}</div>
              <div class="book-category">Category: ${book.category}</div>
              <div class="buttons flex flex-between">
                
              <button id="editBook" class="btn-shape btn-effect">
                  <a href="${
                    book.link
                  }"> <i class="fas fa-shopping-cart"></i> Buy</a>
                </button>

                <button id="borrow" class="btn-shape btn-effect ${
                  book.available ? "" : "notAvailable"
                }" onclick="handleBorrowedBook(${book.id})">
                   <i class="fas fa-handshake"></i> Borrow
                </button>
                </div>
                <button id="moreDetails" class="btn-shape btn-effect" onclick="handleMoreDetails(${
                  book.id
                })">
                  <i class="fas fa-info-circle"></i> More Details
                </button>
            </div>
    `;
      booksHolder.appendChild(bookHolder);
    });
  } else {
    booksHolder.innerHTML = '<div class="no-books">No books found</div>';
  }
}

function handleBorrowedBook(id) {
  let book = adminBooks.find((book) => book.id === id);

  if (book.available) {
    let _url = `http://localhost:8000/books/${id}/`;
    book.available = false;
    delete book.image;

    fetch(_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (!res.ok) {
          let err = res.json();
          throw new Error(err.message || "Error borrowing book");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Good job!",
          text: "The book has been borrowed successfully",
          icon: "success",
        });
        renderBooks(adminBooks);
        borrowedBooks.push(book);
        localStorage.setItem(
          "borrowedBooks",
          JSON.stringify({
            userID: JSON.parse(localStorage.getItem("user")).id,
            userBooks: borrowedBooks,
          })
        );
      });
  } else if (!book.available) {
    Swal.fire({
      title: "Some error!",
      text: "The book has been borrowed already!",
      icon: "error",
    });
  }
}

function handleMoreDetails(id) {
  window.location.href = `../more-details/more-details.html?id=${id}`;
}

// Handle search
let searchInput = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
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

searchBtn.addEventListener("click", searchBooks);
searchInput.addEventListener("keyup", searchBooks);

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("borrowedBooks");
});
