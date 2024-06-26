// Store borrowedBooks in array
let borrowedBooks = [];

// Add to localstorage if no borrowedBooks
if (!localStorage.getItem("borrowedBooks")) {
  localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
}
