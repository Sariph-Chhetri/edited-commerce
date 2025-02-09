import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
import { UserProvider } from './Context/userContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <ShopContextProvider>
    <App />
    </ShopContextProvider>
    </UserProvider>
  </React.StrictMode>
);

