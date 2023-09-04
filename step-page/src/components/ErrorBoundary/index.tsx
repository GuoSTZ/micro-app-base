import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error;
  errorInfo: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      error: null, 
      errorInfo: null 
    };
  }
  
  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error?.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
