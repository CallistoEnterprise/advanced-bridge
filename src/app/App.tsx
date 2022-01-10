import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { Provider } from 'react-redux';
import '../styles/app.css';
import './app.i18n';
import AppRouter from './AppRouter';
import store from './core/store';
import { getLibrary } from './utils/web3React';

// containerBuilder();

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <div className="app">
          <AppRouter />
        </div>
      </Provider>
    </Web3ReactProvider>
  );
}
