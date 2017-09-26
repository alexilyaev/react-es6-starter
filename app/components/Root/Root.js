import './Root.scss';

import React from 'react';

import Hello from '../Hello/Hello';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default class Root extends React.Component {
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
