import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import Router from './Routes/Router.jsx';
import UseCoursesProvider from './Routes/useCourses';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UseCoursesProvider>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </UseCoursesProvider>
  </StrictMode>
);
