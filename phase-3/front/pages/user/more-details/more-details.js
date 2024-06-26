// Toggling navbar in mobile
let menu = document.getElementById("menu-icon");
let nav = document.getElementById("toogle-nav");
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
let adminBooks = [];

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

  // Target book id
  let id = +new URLSearchParams(window.location.search).get("id");

  // Get book
  let book = adminBooks.find((b) => b.id === id);
  console.log(book);

  let bookDetails = document.getElementById("book-details");

  function renderBook() {
    bookDetails.innerHTML = "";
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book-div");
    bookDiv.innerHTML = `
      <div id="${book.id}">
        <div class="name-author-category">
          <p id="name"> <b>Name:</b> <b id="nm"> ${book.name}</b></p>
          <p id="author"><b>Author: </b> ${book.author}</p>
          <p id="category"><b>Category: </b> ${book.category}</p>
        </div>
        <b>Description:</b>
        <div class="description">
          <p>
            ${book.description}
          </p>
        </div>
      </div>
    `;
    bookDetails.appendChild(bookDiv);
  }

  // Render the book after it's found
  if (book) {
    renderBook();
  } else {
    console.error("Book not found");
  }
});

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("borrowedBooks");
});
