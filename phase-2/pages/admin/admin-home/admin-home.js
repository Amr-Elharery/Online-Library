let booksHolder = document.getElementById("booksHolder");
let adminBooks = JSON.parse(localStorage.getItem("books")) || [];

function renderBooks(books) {
  booksHolder.innerHTML = "";
  if (books.length > 0) {
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
                  <button id="editBook" class="btn-shape btn-effect"  onclick="handleEditBook(${book.id})">
                    <a href="../edit-book/edit-book.html">Edit</a>
                  </button>
  
                  <button class="btn-shape btn-effect ${
                    book.available ? "" : "notAvailable"
                  }">${book.available ? "Available" : "Not Available"}</button>
                  
                  <button id="deleteBook" class="btn-shape btn-effect" onclick="handleDeleteBook(${
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

renderBooks(adminBooks);

function handleDeleteBook(id) {
  let index = adminBooks.findIndex((book) => book.id === id);
  adminBooks.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(adminBooks));
  renderBooks(adminBooks);
}

function handleEditBook(id) { 
  let bookDetails = adminBooks.find((book) => book.id === id);
  sessionStorage.setItem("editedBook",  JSON.stringify(bookDetails));
}

// For reset stored books
let renderStoredBooksBtn = document.getElementById("renderStoredBooks");

//============================
//====For development use only
//============================
renderStoredBooksBtn.addEventListener("click", () => {
  localStorage.removeItem("books");
  let books = [
    {
      id: 1,
      link: "https://printige.net/product/engineering-optical-networks",
      name: "Engineering Optical Networks",
      image: "1.png",
      initialBook: true,
      available: false,
      author: "Sudhir Warier",
      category: "Physics",
      description:
        "Written by a leading expert in the field, this book provides a comprehensive introduction to the fundamental concepts of transport and data networks. This resource examines backbone network architectures and functions. The evolution, key components, and techniques of telecommunication networks are presented, including voice and data transmission, fiber optic communication and optical link design. This book explores the photonic network architecture and includes chapters on transport networks, synchronous optical networks, optical transport networks, and dense wavelength division multiplexing.",
    },
    {
      id: 2,
      link: "https://printige.net/product/clean-code/",
      name: "Clean Code",
      image: "2.jpg",
      initialBook: true,
      available: true,
      author: "Robert C. Martin",
      category: "Software Engineering",
      description:
        "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with this book.",
    },
    {
      id: 3,
      link: "https://printige.net/product/essential-math-for-data-science/",
      name: "Essential Math for Data Science",
      image: "3.jpg",
      initialBook: true,
      available: true,
      author: "Thomas Nield",
      category: "Mathmatics",
      description:
        "Master the math needed to excel in data science, machine learning, and statistics. In this book author Thomas Nield guides you through areas like calculus, probability, linear algebra, and statistics and how they apply to techniques like linear regression, logistic regression, and neural networks. Along the way you’ll also gain practical insights into the state of data science and how to use those insights to maximize your career.",
    },
    {
      id: 4,
      link: "https://printige.net/product/atomic-habits/",
      name: "Atomic Habits",
      image: "4.jpg",
      initialBook: true,
      available: true,
      author: "James Clear",
      category: "Self-Help",
      description:
        "No matter your goals, Atomic Habits offers a proven framework for improving – every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    },
    {
      id: 5,
      link: "https://printige.net/product/thinking-with-type/",
      name: "Thinking With Type",
      image: "5.jpg",
      initialBook: true,
      available: false,
      author: "Ellen Lupton",
      category: "Graphic Design",
      description:
        "Thinking with Type is the definitive guide to using typography in visual communication, from the printed page to the computer screen. This revised edition includes forty-eight pages of new content, including the latest information on style sheets for print and the web, the use of ornaments and captions, lining and non-lining numerals, the use of small caps and enlarged capitals, as well as information on captions, font licensing, mixing typefaces, and hand lettering. Throughout the book, visual examples show how to be inventive within systems of typographic form—what the rules are and how to break them. Thinking with Type is a type book for everyone: designers, writers, editors, students, and anyone else who works with words.",
    },
  ];
  // Add to localstorage if no books
  if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify(books));
  }

  renderBooks(books);
});

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
