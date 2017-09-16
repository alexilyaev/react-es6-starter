import './hello.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class Hello extends React.Component {
  constructor() {
    super();

    this.state = {
      now: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        now: new Date().toLocaleTimeString()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="hello">
        <h2 className="hello-message">
          {this.props.message}
        </h2>

        <p>Change my text in hello.js to test if HMR re-renders everything or just me.</p>
      </div>
    );
  }
}

Hello.propTypes = {
  message: PropTypes.string
};

Hello.defaultProps = {
  message: 'Hello World'
};
