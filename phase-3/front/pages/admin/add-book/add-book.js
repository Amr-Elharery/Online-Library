var currentPageUrl = window.location.href;

function highlightActiveLink() {
  var links = document.querySelectorAll('nav a');

  links.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add('active');
    }
  });
}

highlightActiveLink();

let form = document.getElementById('add-form');
let submitBtn = document.getElementById('add-submit');

let books = JSON.parse(localStorage.getItem('books')) || [];

let imageSrc = '';
function handleImageLoad() {
  const fileInput = document.getElementById('book_image');

  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imageSrc = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
}
handleImageLoad();
submitBtn.addEventListener('click', () => {
  if (validate()) {
    let book = {
      id: getMaxId(books) + 1,
      name: document.getElementById('book_name').value,
      available: true,
      author: document.getElementById('book_author').value,
      category: document.getElementById('book_category').value,
      description: document.getElementById('book_description').value,
      initialBook: false,
      image: imageSrc,
    };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    Swal.fire({
      title: 'Successfully added!',
      text: 'You got added book successfully!',
      icon: 'success',
    });

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
