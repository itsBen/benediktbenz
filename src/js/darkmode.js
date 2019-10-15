const init = () => {
    // Look for .mode-switch and attach the on click listener
    const button = document.querySelector(".mode-switch");
    addOnClickHandler(button);
}

const addOnClickHandler = (button) => {
    // On click
    button.addEventListener("click", () => {
        switchIcons();
        toggleMode();
    });
}

const toggleMode = () => {
    const bodyElement = document.getElementsByTagName("body")[0]

    bodyElement.classList.toggle("dark");
}

const switchIcons = () => {
    let iconLight = document.getElementById("icon-light-mode");
    let iconDark = document.getElementById("icon-dark-mode");

    iconLight.classList.toggle("hidden");
    iconDark.classList.toggle("hidden");
}

module.exports = {
    init: init
};