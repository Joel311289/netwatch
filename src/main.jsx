import React from 'react';
import ReactDOM from 'react-dom';

import { ContainerContextProvider } from '@contexts/ContainerContext';
import { ThemeContextProvider } from '@contexts/ThemeContext';

import { httpInterceptor } from '@services/http-interceptor';

import './index.css';
import App from './App';

httpInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <ContainerContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ContainerContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
