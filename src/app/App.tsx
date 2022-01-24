import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/app.css';
import './app.i18n';
import AppRouter from './AppRouter';
import configureStore from './core/store';
// import { store } from './core/store';
import { getLibrary } from './utils/web3React';
const { persistor, store } = configureStore();
// containerBuilder();

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="app">
            <AppRouter />
          </div>
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  );
}
