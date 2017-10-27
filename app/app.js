import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';

import './assets/styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root/Root';

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
