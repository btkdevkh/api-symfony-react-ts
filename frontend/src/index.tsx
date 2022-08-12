import React from 'react';
import { createRoot } from 'react-dom/client'
import './assets/css/index.css';
import App from './App';

const root = document.getElementById('root') as HTMLDivElement
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);