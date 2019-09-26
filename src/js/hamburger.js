export default function init() {
    // Look for .hamburger and attach the on click listener
    const hamburger = document.querySelector(".hamburger");
    addEventHandler(hamburger);
}

function addEventHandler(element) {
    // On click
    element.addEventListener("click", function () {
        // Toggle class "is-active"
        element.classList.toggle("is-active");
        // Do something else, like open/close menu
    });
}