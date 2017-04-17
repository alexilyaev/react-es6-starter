import './root.scss';

import React from 'react';

export default class Root extends React.Component {
  renderHeading() {
    return <h1 className="root-heading">React ES6 Starter!</h1>;
  }

  render() {
    return (
      <div className="root">
        { this.renderHeading() }
      </div>
    );
  }
}
