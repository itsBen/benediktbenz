# benediktbenz

Minimal Webpack 4 based personal website.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2a89a8dd-e6eb-494b-b685-58cc6cd7e837/deploy-status)](https://app.netlify.com/sites/stupefied-darwin-cd96c2/deploys)

## Usage

### .env

according to [this](https://create-react-app.dev/docs/adding-custom-environment-variables) the following scripts will automatically run the mentioned files

`npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
`npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
`npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

so instead of this in `package.json`:
- `"start": "cross-env NODE_ENV=development webpack-dev-server --config config/webpack.dev.config.js",`
- `"build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.config.js"`

we can do this:
- `"start": "webpack-dev-server --config config/webpack.dev.config.js",`
- `"build": "webpack --config config/webpack.prod.config.js"`

### Development server

```bash
npm start
```

### Production build

```bash
npm run build
```

## Credits

This project uses several open source packages:

* <a href="https://github.com/jonsuh/hamburgers" target="_blank">hamburgers</a>
* <a href="https://ionicons.com/" target="_blank">Ionicons</a>

<br>

## License

[MIT](https://github.com/itsBen/benediktbenz/blob/master/LICENCE.md)


## Author

> [benediktbenz.com](https://www.benediktbenz.com) &nbsp;&middot;&nbsp;
> GitHub [@itsBen](https://github.com/itsben)