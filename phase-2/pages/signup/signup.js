document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "../login/login.html";
  });

var currentPageUrl = window.location.href;

function highlightActiveLink() {
  var links = document.querySelectorAll("nav a");

  links.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add("active");
    }
  });
}

highlightActiveLink();

let menu = document.getElementById("menu-icon");
let nav = document.getElementById("toogle-nav");

// Toggling navbar in mobile
menu.addEventListener("click", () => {
  if (nav.style.left != "0px") {
    nav.style.display = "flex";
    setTimeout(() => {
      nav.style.left = "0px";
      nav.style.opacity = "1";
    }, 100);
  } else {
    nav.style.left = "100%";
    nav.style.opacity = "0";
    setTimeout(() => {
      nav.style.display = "none";
    }, 100);
  }
});
