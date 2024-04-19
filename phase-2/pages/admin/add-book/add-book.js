var currentPageUrl = window.location.href;


function highlightActiveLink() {
var links = document.querySelectorAll('nav a');

links.forEach(function(link) {

if (link.href === currentPageUrl) {
    link.classList.add('active'); 
}
});
}

highlightActiveLink();
