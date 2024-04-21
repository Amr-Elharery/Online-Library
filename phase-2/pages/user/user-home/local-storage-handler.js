var currentPageUrl = window.location.href;



function addBookToLocalStorage(book) {
    try {
        // Get existing books (or initialize empty array)
        const storedBooks = localStorage.getItem('borrowedBooks');
        let books = storedBooks ? JSON.parse(storedBooks) : [];

        // Assign a unique ID and add borrow date if not provided
        if (!book.hasOwnProperty('id')) {
            book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
            newBook = { ...book, dateBorrowed: Date.now() };
        } else {
            newBook = book; // No need to modify original book if ID exists
        }

        // Add the new book to the array
        books.push(newBook);

        // Update local storage with the new list
        localStorage.setItem('borrowedBooks', JSON.stringify(books));

    } catch (error) {
        console.error("Error adding book to local storage:", error);
    }
}



let borrowedBooks = getBorrowedBooks();


// Store updated borrowed books in local storage
// storeBorrowedBooks(borrowedBooks);

// Display borrowed books in table
displayBorrowedBooks(borrowedBooks);



function getBookById(bookId) {
    try {
        const storedBooks = localStorage.getItem('books');

        // Check if local storage has any books
        if (!storedBooks) {
            return null;
        }

        const books = JSON.parse(storedBooks); // Parse stored JSON data

        // Check if book ID exists
        if (books[bookId]) {
            console.log(books[bookId]);
            return books[bookId];
        } else {
            console.log("there is no books")
            return null;  // Book not found
        }
    } catch (error) {
        console.error("Error getting book by ID:", error);
        return null;
    }
}

function borrowBook(id){
    let newBook = getBookById(id);
    if(newBook){
        addBookToLocalStorage(newBook);
    }else{
        console.log("Error in adding book");
    }
}