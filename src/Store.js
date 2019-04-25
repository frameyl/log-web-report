import { createStore } from 'redux';
import reducer from './Reducer.js';

const initValues = {
    'build': null,
    'job': null,
    'module': null,
    'table_data': [],
};

const store = createStore(reducer, initValues);

export default store;
