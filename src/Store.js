import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import promiseMiddleware from './promise_middleware.js';
import queryReducer from './Reducer.js';
//import Perf from 'react-addons-perf';
import * as Status from './Status.js';

const win = window;
//win.Perf = Perf;

const initValues = {
    'build': [],
    'job': [],
    'module': [],
    table_data: [],
    status: Status.LOADING,
};

const reducer = combineReducers({
    query: queryReducer
});

const middlewares = [thunkMiddleware];
//if (process.env.NODE_ENV !== 'production') {
//    middlewares.push(require('redux-immutable-state-invariant')());
//}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const store = createStore(reducer, {}, storeEnhancers);

export default store;
