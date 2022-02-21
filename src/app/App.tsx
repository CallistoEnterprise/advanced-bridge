import { Web3ReactProvider } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { Provider } from 'react-redux';
// containerBuilder();
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeUpdater from '~/app/modules/home/updater';
import './app.i18n';
import AppRouter from './AppRouter';
import configureStore from './core/store';
// import { store } from './core/store';
import { getLibrary } from './utils/web3React';

// const { store } = configureStore();
toast.configure();

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
});

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={configureStore}>
        <HomeUpdater />
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <div className="app">
          <AppRouter />
        </div>
        {/* </PersistGate> */}
      </Provider>
    </Web3ReactProvider>
  );
}
