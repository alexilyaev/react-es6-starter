import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';

import './assets/styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/root/root';

// Disable RedBox for errors, can be removed when the issue is resolved
// https://github.com/gaearon/react-hot-loader/issues/462
delete AppContainer.prototype.unstable_handleError;

function renderClient(RootComponent) {
  render(
    <AppContainer>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RootComponent} />
        </Switch>
      </BrowserRouter>
    </AppContainer>,
    document.querySelector('#app')
  );
}

renderClient(Root);

// Enables hot-reload without page refresh. Removed during `build`
if (module.hot) {
  module.hot.accept();
}
