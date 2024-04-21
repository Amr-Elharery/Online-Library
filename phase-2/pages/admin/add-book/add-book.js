let form = document.getElementById('add-form');
let submitBtn = document.getElementById('add-submit');

let books = JSON.parse(localStorage.getItem('books')) || [];
submitBtn.addEventListener('click', () => {
  if (validate) {
    let book = {
      id: getMaxId(books) + 1,
      name: document.getElementById('book_name').value,
      available: true,
      author: document.getElementById('book_author').value,
      category: document.getElementById('book_category').value,
      description: document.getElementById('book_description').value,
    };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    window.location.href = '../admin-home/admin-home.html';
  }
});

function validate() {
  let bookName = document.getElementById('book_name').value;
  let bookAuthor = document.getElementById('book_author').value;
  let bookCategory = document.getElementById('book_category').value;
  let bookDescription = document.getElementById('book_description').value;
  if (
    bookName == '' ||
    bookAuthor == '' ||
    bookCategory == '' ||
    bookDescription == ''
  ) {
    alert('Please fill all the fields');
    return false;
  } else {
    return true;
  }
}

function getMaxId(books) {
  if (books) {
    let max = 0;
    for (let i = 0; i < books.length; i++) {
      if (books[i].id > max) {
        max = books[i].id;
      }
    }
    return max;
  } else {
    return 0;
  }
}

function handleImageLoad() {
  const fileInput = document.getElementById('book_image');
  const previewImage = document.getElementById('previewImage');

  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target.result);
        previewImage.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
}

handleImageLoad();
