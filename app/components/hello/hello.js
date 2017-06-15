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
          { this.props.message }
        </h2>

        <p>
          Go ahead and play around, it's all good.
        </p>

        <footer>
          { this.state.now }
        </footer>
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
