import './root.scss';

import React from 'react';

import Hello from '../hello/hello';

export default class Root extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        counter: this.state.counter + 1
      });
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderHeading() {
    return (
      <h1 className="root-heading">
        React ES6 Starter!
      </h1>
    );
  }

  render() {
    return (
      <div className="root">
        {this.renderHeading()}
        <h2>Counter in root: {this.state.counter}</h2>
        <Hello message="Welcome to React." />
      </div>
    );
  }
}
