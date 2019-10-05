const init = () => {
    // Look for .mode-switch and attach the on click listener
    const button = document.querySelector(".mode-switch");
    addOnClickHandler(button);
}

const addOnClickHandler = (button) => {
    // On click
    button.addEventListener("click", () => {

        switchIcons();

        /*
        if (iconElement.classList.contains("ion-md-moon")) {
            iconElement.classList.remove("ion-md-moon");
            iconElement.classList.add("ion-md-sunny");
        } else {
            iconElement.classList.remove("ion-md-sunny");
            iconElement.classList.add("ion-md-moon");
        }
        */
    });
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