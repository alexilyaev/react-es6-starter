/**
 * Ref:
 * https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html
 */

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Oops, there was an ERROR</h2>
          <p>{this.state.error && this.state.error.toString()}</p>

          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}
