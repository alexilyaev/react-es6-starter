import './root.scss';

import React from 'react';

export default class Root extends React.Component {

  renderHeading() {
    return <h1>Welcome to React ES6 Starter!</h1>;
  }

  render() {
    return (
      <div>
        { this.renderHeading() }
      </div>
    );
  }
}
