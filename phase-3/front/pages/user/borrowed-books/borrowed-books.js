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

let user = JSON.parse(localStorage.getItem("user"));
let userborrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks"));
if (user.id == userborrowedBooks.userID) {
  // Function to get borrowed books from local storage
  function getBorrowedBooks() {
    const storedBooks = userborrowedBooks.userBooks;
    return storedBooks;
  }
  // Function to create a table row element for a book
  function createBookRow(book) {
    const tableRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = book.name;
    tableRow.appendChild(nameCell);

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    tableRow.appendChild(authorCell);

    return tableRow;
  }

  // Function to display borrowed books in a table
  function displayBorrowedBooks(books) {
    const tableBody = document.getElementById("borrowedBooks");
    tableBody.innerHTML = ""; // Clear existing rows
    for (const book of books) {
      const bookRow = createBookRow(book);
      tableBody.appendChild(bookRow);
    }
  }
  // (Sample books and storage functions remain the same)
  // Get existing borrowed books from local storage
  let borrowedBooks = getBorrowedBooks();
  // Display borrowed books in table
  displayBorrowedBooks(borrowedBooks);
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("borrowedBooks");
});
