// // JavaScript
// // ==================================================
// import darkmode from "./js/darkmode";

// darkmode.init();

// // Styles
// // ==================================================
// import "./style/index.scss";

// // Images
// // ==================================================
// import me from "./images/benedikt-benz.200x200.jpg";

// Test import of a JavaScript module
import { example } from '@/js/example'

// Test import of an asset
import webpackLogo from '@/images/benedikt-benz.jpg'

// Test import of styles
import '@/styles/index.scss'

// Appending to the DOM
const logo = document.createElement('img')
logo.src = webpackLogo

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')
app.append(logo, heading)
