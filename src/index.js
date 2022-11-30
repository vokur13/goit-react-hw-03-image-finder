import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { ToastContainer } from 'react-toastify';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
       <ToastContainer position="top-left" autoClose={5000} />
    </ThemeProvider>
  </React.StrictMode>
);
