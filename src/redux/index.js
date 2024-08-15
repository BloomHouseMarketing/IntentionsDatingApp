import rootReducer from '../redux/reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {createTransform} from 'redux-persist';
import {stringify, parse} from 'flatted';

const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
);
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transformCircular],
};
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancer = compose(applyMiddleware(sagaMiddleware, thunk, logger));

let store = createStore(persistedReducer, enhancer);
export let persistor = persistStore(store);

export default store;
