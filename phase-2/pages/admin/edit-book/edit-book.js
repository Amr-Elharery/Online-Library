let bookDetail = JSON.parse(sessionStorage.getItem("editedBook"));
const editForm = document.getElementById("edit-form");
let books = JSON.parse(localStorage.getItem("books")) || [];

function getBookDetails() {
  document.getElementById("book-id").value = bookDetail.id;
  document.getElementById("book-name").value = bookDetail.name;
  document.getElementById("author").value = bookDetail.author;
  document.getElementById("category").value = bookDetail.category;
  document.getElementById("description").value = bookDetail.description;
}

function updateBook(e) {
  e.preventDefault();
  const updatedId = +document.getElementById("book-id").value;
  const updatedName = document.getElementById("book-name").value;
  const updatedAuthor = document.getElementById("author").value;
  const updatedCategory = document.getElementById("category").value;
  const updatedDescription = document.getElementById("description").value;
  let index = books.findIndex((book) => book.id === bookDetail.id);
  books[index] = {
    id: updatedId,
    name: updatedName,
    author: updatedAuthor,
    category: updatedCategory,
    description: updatedDescription,
    image: bookDetail.image,
    initialBook: bookDetail.initialBook,
    available: bookDetail.available,
    link: bookDetail.link,
  };
  localStorage.setItem("books", JSON.stringify(books));

  // For testing
  console.log("Before ",location.href);
  window.location.href = '../admin-home/admin-home.html';
}

getBookDetails();
editForm.addEventListener("submit", (e)=> updateBook(e));
