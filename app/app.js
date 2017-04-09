import 'normalize.css/normalize.css';
import './assets/styles/main.scss';

import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Root from './components/root/root';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ Root } />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
