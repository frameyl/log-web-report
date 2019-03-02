import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Grid from './grid/Grid.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Grid />
        <App />
    </div>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
