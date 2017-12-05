import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import percents from './percents';

const store = createStore(percents);

export default store;
