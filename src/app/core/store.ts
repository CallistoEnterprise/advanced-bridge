// import { applyMiddleware, compose, createStore } from 'redux';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
// import createSagaMiddleware from 'redux-saga';
// import rootReducers from './reducer'; // where reducers is a object of reducers
// import rootSaga from './rootSaga';

// const middleware = [];
// const sagaMiddleware = createSagaMiddleware();

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// middleware.push(sagaMiddleware);

// const composeEnhancers =
//   process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose;

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['doctor']
// };

// const persistedReducer = persistReducer<any, any>(persistConfig, rootReducers);

// const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
// const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers));
// const persistor = persistStore(store);
// const configureStore = () => {
//   return { persistor, store };
// };

// sagaMiddleware.run(rootSaga);

// export type AppState = ReturnType<typeof store.getState>;
// export default configureStore;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { load, save } from 'redux-localstorage-simple';
import createSagaMiddleware from 'redux-saga';
import home from '~/app/modules/home/reducer';
import lists from '~/app/modules/lists/reducer';
import multicall from '~/app/modules/multicall/reducer';
import swap from '~/app/modules/swap/reducer';
import wallet from '~/app/modules/wallet/reducer';
import rootSaga from './rootSaga';

const PERSISTED_KEYS: string[] = ['homeBridge', 'walletBridge'];
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    homeBridge: home,
    walletBridge: wallet,
    swapBridge: swap,
    listsBridge: lists,
    multicallBridge: multicall
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), sagaMiddleware, save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS })
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
