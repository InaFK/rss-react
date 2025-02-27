import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSetter from './components/ThemeSetter/ThemeSetter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
        <ThemeSetter />
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
