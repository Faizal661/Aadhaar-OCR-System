import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            color: "#fff",
            backgroundColor: "#c03900",
            borderRadius: "8px",
            margin: "1rem 0",
          }}
        >
          {/* <h2>Something went wrong.</h2> */}
          <h2>{this.state.error && this.state.error.toString()}</h2>
          <p>
            {/* {this.state.error && this.state.error.toString()} */}
            <details>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
