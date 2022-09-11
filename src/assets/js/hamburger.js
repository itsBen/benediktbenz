const addEventHandler = (element) => {
  // On click
  element.addEventListener('click', () => {
    // Toggle class "is-active"
    element.classList.toggle('is-active');
    // Do something else, like open/close menu
  });
};

const init = () => {
  // Look for .hamburger and attach the on click listener
  const hamburger = document.querySelector('.hamburger');
  addEventHandler(hamburger);
};

module.exports = {
  init,
};
