import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import axios from 'axios';

// Configure global API base URL for production backend connection
axios.defaults.baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || '';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
