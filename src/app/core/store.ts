import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducer'; // where reducers is a object of reducers
import rootSaga from './rootSaga';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

middleware.push(sagaMiddleware);

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['doctor']
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducers);

const enhancers = [applyMiddleware(...middleware)];
const initialState = {};
const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers));
const persistor = persistStore(store);
const configureStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(rootSaga);

export default configureStore;
