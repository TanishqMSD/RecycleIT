import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import './index.css';
import App from './App';  // Import App component
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

// Create a root element and render the app using createRoot (React 18+)
const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root element
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
