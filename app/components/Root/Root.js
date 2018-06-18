import './Root.scss';

import React from 'react';
import { hot } from 'react-hot-loader';

import Hello from '../Hello/Hello';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class Root extends React.Component {
  renderHeading() {
    return <h1 className="root-heading">React ES6 Starter!</h1>;
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="root">
          {this.renderHeading()}

          <Hello message="Welcome to React." />
        </div>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(Root);
