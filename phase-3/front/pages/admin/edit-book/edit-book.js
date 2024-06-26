let bookDetail = JSON.parse(sessionStorage.getItem('editedBook'));
const editForm = document.getElementById('edit-form');


function getBookDetails() {
  document.getElementById('book-id').value = bookDetail.id;
  document.getElementById('book-name').value = bookDetail.name;
  document.getElementById('author').value = bookDetail.author;
  document.getElementById('category').value = bookDetail.category;
  document.getElementById('description').value = bookDetail.description;
}

function updateBook(e) {
  e.preventDefault();
  const updatedId = +document.getElementById('book-id').value;
  const updatedName = document.getElementById('book-name').value;
  const updatedAuthor = document.getElementById('author').value;
  const updatedCategory = document.getElementById('category').value;
  const updatedDescription = document.getElementById('description').value;

  let _url = `http://localhost:8000/books/${bookDetail.id}/`;
  let data = {
    id: updatedId,
    name: updatedName,
    author: updatedAuthor,
    category: updatedCategory,
    description: updatedDescription,
    available: bookDetail.available,
    link: bookDetail.link,
  };

  fetch(_url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.error('Error response:', err);
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      Swal.fire({
        title: 'Successfully updated!',
        text: 'You got updated book successfully!',
        icon: 'success',
      });
    });

  // For testing
  window.location.href = '../admin-home/admin-home.html';
}

getBookDetails();
editForm.addEventListener('submit', (e) => updateBook(e));

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user');
});
