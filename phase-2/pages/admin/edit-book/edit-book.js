document.getElementById("update-button").addEventListener("click", function() {
    var updatedId = document.getElementById("book-id").value;
    var updatedName = document.getElementById("book-name").value;
    var updatedAuthor = document.getElementById("author").value;
    var updatedCategory = document.getElementById("category").value;
    var updatedDescription = document.getElementById("description").value;

    

    alert("Book details updated successfully:\nId: " + updatedId + "\nBook Name: " + updatedName
    + "\nAuthor: " + updatedAuthor
    + "\nCategory: " + updatedCategory
    + "\nDescription: " + updatedDescription

);
});