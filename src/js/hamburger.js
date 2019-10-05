export const init = () => {
    // Look for .hamburger and attach the on click listener
    const hamburger = document.querySelector(".hamburger");
    addEventHandler(hamburger);
}

const addEventHandler = (element) => {
    // On click
    element.addEventListener("click", function () {
        // Toggle class "is-active"
        element.classList.toggle("is-active");
        // Do something else, like open/close menu
    });
}