[React ES6 Starter](https://github.com/alexilyaev/react-es6-starter)
==================

[![Build Status](http://circleci-badges-max.herokuapp.com/img/alexilyaev/react-es6-starter?token=e51a95d02f9b923f13cb91e1ba62d9250bc3b961)](https://circleci.com/gh/alexilyaev/react-es6-starter)
[![codebeat badge](https://codebeat.co/badges/9b379fde-5e50-4c18-81b5-3b27b9bf7fae)](https://codebeat.co/projects/github-com-alexilyaev-react-es6-starter-master)
[![Dependency Status](https://david-dm.org/alexilyaev/react-es6-starter.svg)](https://david-dm.org/alexilyaev/react-es6-starter)
[![Dependency Status](https://david-dm.org/alexilyaev/react-es6-starter/dev-status.svg)](https://david-dm.org/alexilyaev/react-es6-starter#info=devDependencies)

Features
----------

- Webpack 3
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
    - If using clone, remove the `.git` folder and [init a new Git repo](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) (name it something else)
1. Update the README to your needs
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

- Must use a server that serves missing routes as `index.html`

### To run the build locally

```
npm i -g live-server
live-server --mount=/:dist --entry-file=dist/index.html
```
