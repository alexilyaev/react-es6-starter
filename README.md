React ES6 Starter
==================

Features
----------

- Webpack 2
  - Transpiles `.js` files using Babel (settings in `.babelrc`)
  - Transpiles `.scss` files using node-sass
  - ESLint - Lints `js` files on changes (rules in `.eslintrc`)
  - Stylelint - Lints `scss` files on changes (rules in `.stylelintrc`)
  - PostCSS plugins (settings in `postcss.config.js`)
    - Autoprefixer (supported browsers list in `browserslist` file)
  - Dynamic `index.html` generation
  - Dynamic build file names with hash for cache busting
- React
  - React Hot Loader v3
  - React Router v4
    - HTML5 History API (non hash routes)

Getting Started
----------------

1. Install Node.js (choose Current)
    - From [nodejs.org](https://nodejs.org/) (All platforms)
    - Or using [Homebrew](http://blog.teamtreehouse.com/install-node-js-npm-mac) (Mac)
    - Or any other [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
1. `git clone` or [Download](https://github.com/alexilyaev/react-es6-starter/archive/master.zip) this repo
    - If using clone, remove the `.git` folder and [init a new Git repo](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
1. Install dependencies (at the root of the repo):

    ```
    npm install
    ```

Development
------------

#### Run webpack-dev-server

```
npm start
```

- Open `http://localhost:8080`

Build the project for deployment
---------------------------------

```
npm run build
```

- Must use a server that redirects missing routes back to `index.html`

### To run the build locally

```
npm i -g live-server
cd dist/
live-server --entry-file=index.html
```
