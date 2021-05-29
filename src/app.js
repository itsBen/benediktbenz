/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable semi */
// JavaScript
// ==================================================
import darkmode from '@/js/darkmode'

// Styles
// ==================================================
import '@/styles/index.scss'

// Images
// ==================================================
import imageBenediktBenz from '@/images/benedikt-benz.jpg'

darkmode.init()

document.getElementById('image-benedikt-benz').src = imageBenediktBenz

// // Test import of a JavaScript module
// import { example } from '@/js/example'

// // Test import of an asset
// import webpackLogo from '@/images/benedikt-benz.jpg'

// // Test import of styles
// import '@/styles/index.scss'

// // Appending to the DOM
// const logo = document.createElement('img')
// logo.src = webpackLogo

// const heading = document.createElement('h1')
// heading.textContent = example()

// const app = document.querySelector('#root')
// app.append(logo, heading)
