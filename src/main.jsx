import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource/outfit';
import './index.css'
import App from './App.jsx'
import { LoaderProvider } from './context/LoaderContext.jsx'
import initProtectionAndTracking, { isLocalEnvironment } from './utils/securityAndErrorTracker'

// Initialize protection (disabled inspect in production, enabled on localhost) and error/missing-file logger
initProtectionAndTracking();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("🚨 [REACT ERROR BOUNDARY]: Uncaught component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (isLocalEnvironment()) {
        return (
          <div style={{ padding: '20px', color: '#b91c1c', background: '#fef2f2', zIndex: 99999, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'auto', fontFamily: 'monospace' }}>
            <h2 style={{ color: '#991b1b' }}>⚠️ React Rendering Error (Local Dev Mode)</h2>
            <p>Details are shown because you are on localhost:</p>
            <details open style={{ whiteSpace: 'pre-wrap', background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
              {this.state.error && this.state.error.toString()}
              <br /><br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            <button onClick={() => window.location.reload()} style={{ marginTop: '16px', padding: '8px 16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Reload Page
            </button>
          </div>
        );
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', textAlign: 'center', background: '#0f172a', color: '#fff' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fcca26' }}>Oops! Something went wrong</h2>
          <p style={{ color: '#94a3b8', maxWidth: '480px', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            An unexpected error occurred while loading this page. Our team has recorded this in the application logs.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #fcca26 0%, #f59e0b 100%)', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <LoaderProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </LoaderProvider>
    </ErrorBoundary>
  </StrictMode>,
)
