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
let adminBooks = JSON.parse(localStorage.getItem("books")) || [];
let userBorrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

function renderBooks(books) {
  booksHolder.innerHTML = "";
  books.forEach((book) => {
    let bookHolder = document.createElement("div");
    bookHolder.classList.add("book");
    bookHolder.innerHTML = `
             <div class="book-img">
              <img src=${
                book.initialBook
                  ? `../../../media/books/${book.image}`
                  : `${book.image}`
              } alt="Book" />
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

                <button id="borrow" class="btn-shape btn-effect" onclick="handleBorrowedBook(${
                  book.id
                })">
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
}

renderBooks(adminBooks);

function handleBorrowedBook(id) {
  let book = adminBooks.find((book) => book.id === id);
  userBorrowedBooks.push(book);
  localStorage.setItem("borrowedBooks", JSON.stringify(userBorrowedBooks));
  alert("The book has been added to your borrowed books list successfully");
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
