import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { Provider } from 'react-redux';
// containerBuilder();
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import './app.i18n';
import AppRouter from './AppRouter';
import configureStore from './core/store';
// import { store } from './core/store';
import { getLibrary } from './utils/web3React';

const { persistor, store } = configureStore();

toast.configure();

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
