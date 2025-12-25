/**
 * React Error Boundary Component with enhanced diagnostics
 * Uses DiagnosticManager for comprehensive error tracking and reporting
 */

import React from "react";
import { diagnosticManager } from "./diagnosticManager.js";

// React Error Boundary Component with enhanced diagnostics
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorContext = {
      componentStack: errorInfo.componentStack,
      errorBoundary: "ErrorBoundary",
      props: this.props,
    };

    const errorData = diagnosticManager.logError(error, errorContext);

    this.setState({
      error: error,
      errorInfo: errorData,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
          <div className="bg-neutral-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-red-400 text-xl font-bold mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-300 mb-4">
              The application encountered an unexpected error. This has been
              logged for debugging.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
              >
                Reload Page
              </button>
              <button
                onClick={() =>
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Try Again
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4">
                <summary className="text-gray-400 cursor-pointer">
                  Error Details (Dev Mode)
                </summary>
                <pre className="text-red-300 text-sm mt-2 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
