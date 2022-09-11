const toggleMode = () => {
  const bodyElement = document.getElementsByTagName('body')[0];

  bodyElement.classList.toggle('dark');
};

const switchIcons = () => {
  const iconLight = document.getElementById('icon-light-mode');
  const iconDark = document.getElementById('icon-dark-mode');

  iconLight.classList.toggle('hidden');
  iconDark.classList.toggle('hidden');
};

const addOnClickHandler = (button) => {
  // On click
  button.addEventListener('click', () => {
    switchIcons();
    toggleMode();
  });
};

const init = () => {
  // Look for .mode-switch and attach the on click listener
  const button = document.querySelector('.mode-switch');
  addOnClickHandler(button);
};

module.exports = {
  init,
};
