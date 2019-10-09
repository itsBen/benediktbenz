const init = () => {

    // check for stored mode in brower on load
    window.onload = (event) => {
        if (localStorage.getItem("mode") === "dark") {
            //setDarkMode();
            setMode("dark", "ion-md-moon");
        } else {
            //setLightMode();
            setMode("light", "ion-md-sunny");
        }
    };

    // look for .mode-switch and attach the on click listener
    const button = document.querySelector(".mode-switch");
    addOnClickHandler(button);
}

const addOnClickHandler = (button) => {
    // on click
    button.addEventListener("click", () => {
        let bodyElement = document.getElementsByTagName("body")[0];
        let currentMode = bodyElement.getAttribute("data-mode");

        console.log("current mode: " + currentMode);

        if (currentMode === "dark") {
            setMode("light", "ion-md-sunny");
        } else {
            setMode("dark", "ion-md-moon");
        }
    });
}

const setDarkMode = () => {
    // hide dark mode icon to display light mode icon
    let iconDark = document.getElementById("icon-dark-mode");
    iconDark.classList.toggle("hidden");

    // hide other mode
    let button = document.querySelector(".mode-switch");

    Array.from(button.children).forEach((child) => {
        child.classList.toggle("hidden");
    });

    // store the mode in browser to remember the settings
    localStorage.setItem("mode", "dark");

    let bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.setAttribute("data-mode", "dark");
}

// mode can be
// "dark" or "light"
const setMode = (mode, cssClassMode) => {

    // hide other mode by looping through all icons that are
    // children of .mode-switch and hiding them
    // except for the icon of the mode we want
    let button = document.querySelector(".mode-switch");

    Array.from(button.children).forEach((child) => {
        // ignore the icon of the mode we want
        if (!child.classList.contains(cssClassMode))
            child.classList.toggle("hidden");
    });

    // store the mode in browser to remember the settings
    localStorage.setItem("mode", mode);

    let bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.setAttribute("data-mode", mode);
}

const setLightMode = () => {
    // hide light mode icon to display dark mode icon
    let iconLight = document.getElementById("icon-light-mode");
    iconLight.classList.toggle("hidden");

    // store the mode in browser to remember the settings
    localStorage.setItem("mode", "light");

    let bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.setAttribute("data-mode", "light");
}

const toggleMode = () => {
    const bodyElement = document.getElementsByTagName("body")[0]

    bodyElement.classList.toggle("dark");
}

module.exports = {
    init: init
};