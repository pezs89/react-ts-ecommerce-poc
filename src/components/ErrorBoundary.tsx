import React, { Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: null, error: null, info: null };

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info)
    this.setState({ error, info })
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? <>Oops</> : children
  }
}

export default ErrorBoundary;