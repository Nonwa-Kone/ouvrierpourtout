import { combineReducers, createStore } from 'redux';
import workerReducer from './reducers/workerReducer';

const rootReducer = combineReducers({
  workers: workerReducer,
});

const store = createStore(rootReducer);

export default store;
