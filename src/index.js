import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { WatchListContext, WatchListContextProvider } from './context/watchListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WatchListContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </WatchListContextProvider>
  </React.StrictMode>    
);

