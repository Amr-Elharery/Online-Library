// Store borrowedBooks in array
let borrowedBooks = [];
// Add to localstorage if no borrowedBooks
if (!localStorage.getItem('borrowedBooks')) {
  localStorage.setItem('books', JSON.stringify(borrowedBooks));
}