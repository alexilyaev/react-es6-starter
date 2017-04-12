import 'normalize.css/normalize.css';
import './assets/styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Root from './components/root/root';

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Root } />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
