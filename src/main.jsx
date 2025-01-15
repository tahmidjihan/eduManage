import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import Router from './Routes/Router.jsx';
import TanstackCustomHooksProvider from './Routes/useCourses.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TanstackCustomHooksProvider>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </TanstackCustomHooksProvider>
  </StrictMode>
);
