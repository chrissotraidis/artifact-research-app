'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { surveyLogger } from '@/lib/logger';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error
        surveyLogger.error('Uncaught error in component tree', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        });

        this.setState({ errorInfo });
    }

    handleRetry = () => {
        surveyLogger.info('User clicked retry after error');
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
                    <div className="max-w-md text-center">
                        <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#FF4F8E] flex items-center justify-center mb-8 mx-auto">
                            <span className="text-[#FF4F8E] text-2xl">!</span>
                        </div>

                        <h1 className="font-display text-2xl font-bold mb-4 text-[#FAFAFA]">
                            Something went wrong
                        </h1>

                        <p className="text-[#A0A0A0] mb-8">
                            We encountered an unexpected error. Your responses have been preserved.
                            Please try again or refresh the page.
                        </p>

                        <button
                            onClick={this.handleRetry}
                            className="bg-[#E0FF4F] text-[#0D0D0D] px-8 py-4 rounded-lg font-medium hover:brightness-110 transition-all"
                        >
                            Try Again
                        </button>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-8 p-4 bg-[#1A1A1A] rounded-lg text-left border border-[#2A2A2A]">
                                <p className="font-mono text-xs text-[#FF4F8E] mb-2">
                                    {this.state.error.message}
                                </p>
                                <pre className="font-mono text-xs text-[#666666] overflow-auto max-h-40">
                                    {this.state.error.stack}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
