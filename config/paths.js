/* eslint-disable */
const path = require('path')
/* eslint-enable */

module.exports = {

  root: path.join(__dirname, '..'),

  // Source files
  src: {
    root: path.join(__dirname, '..', 'src/'),
    views: path.join(__dirname, '..', 'src', 'views/'),
    images: path.join(__dirname, '..', 'src', 'assets', 'images/'),
    fonts: path.join(__dirname, '..', 'src', 'assets', 'fonts/'),
    styles: path.join(__dirname, '..', 'src', 'assets', 'styles/'),
    scripts: path.join(__dirname, '..', 'src', 'assets', 'js/'),
  },

  // Production build files
  dist: path.join(__dirname, '..', '/dist'),

  // Static files that get copied to build folder
  public: path.join(__dirname, '..', '/public'),
};
