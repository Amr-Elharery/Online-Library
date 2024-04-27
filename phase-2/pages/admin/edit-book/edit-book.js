let bookDetail = JSON.parse(localStorage.getItem("editedBook"));
const form = document.getElementById("edit-form");

function getBookDetails() {
  document.getElementById("book-id").value = bookDetail.id;
  document.getElementById("book-name").value = bookDetail.name;
  document.getElementById("author").value = bookDetail.author;
  document.getElementById("category").value = bookDetail.category;
  document.getElementById("description").value = bookDetail.description;
}

function updateBook() {
  const updatedId = +document.getElementById("book-id").value;
  const updatedName = document.getElementById("book-name").value;
  const updatedAuthor = document.getElementById("author").value;
  const updatedCategory = document.getElementById("category").value;
  const updatedDescription = document.getElementById("description").value;
  let books = JSON.parse(localStorage.getItem("books")) || [];
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
  localStorage.removeItem("books");
  localStorage.setItem("books", JSON.stringify(books));

  alert(
    "Book details updated successfully:\nId: " +
      updatedId +
      "\nBook Name: " +
      updatedName +
      "\nAuthor: " +
      updatedAuthor +
      "\nCategory: " +
      updatedCategory +
      "\nDescription: " +
      updatedDescription
  );
}

getBookDetails();
form.addEventListener("submit", updateBook);
