export function addEventHandler(element){
    // On click
    element.addEventListener("click", function() {
      // Toggle class "is-active"
      element.classList.toggle("is-active");
      // Do something else, like open/close menu
    });
  }