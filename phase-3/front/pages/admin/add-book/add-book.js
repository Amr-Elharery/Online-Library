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


submitBtn.addEventListener('click', () => {
  if (validate()) {
    let book = {
      name: document.getElementById('book_name').value,
      description: document.getElementById('book_description').value,
      author: document.getElementById('book_author').value,
      category: document.getElementById('book_category').value,
      link: document.getElementById('book_link').value,
    };

    let _url = 'http://127.0.0.1:8000/books/';
    fetch(_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.error('Error response:', err);
            throw new Error(err.message || 'Add book failed!');
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: 'Successfully added!',
          text: 'You got added book successfully!',
          icon: 'success',
        });
        setTimeout(() => {
          window.location.href = '../admin-home/admin-home.html';
        }, 1000);
      })
      .catch((error) => console.error('Error:', error));
  }
});

function validate() {
  let bookName = document.getElementById('book_name').value;
  let bookAuthor = document.getElementById('book_author').value;
  let bookCategory = document.getElementById('book_category').value;
  let bookDescription = document.getElementById('book_description').value;
  let bookLink = document.getElementById('book_link').value;
  if (
    bookName == '' ||
    bookAuthor == '' ||
    bookCategory == '' ||
    bookDescription == '' ||
    bookLink == ''
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
    return false;
  } else {
    return true;
  }
}


document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user');
});
