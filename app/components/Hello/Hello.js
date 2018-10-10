import './Hello.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class Hello extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  static defaultProps = {
    message: 'Hello World'
  };

  state = {
    now: new Date().toLocaleTimeString()
  };

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
        <h2 className="hello-message">{this.props.message}</h2>

        <p>Go ahead and play around, it's all good.</p>

        <footer>{this.state.now}</footer>
      </div>
    );
  }
}
