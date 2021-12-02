import React from 'react';
import ReactDOM from 'react-dom';
import { ContainerContextProvider } from './contexts/ContainerContext';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ContainerContextProvider>
      <App />
    </ContainerContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
