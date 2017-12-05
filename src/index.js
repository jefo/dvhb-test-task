import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import store from './redux';

window.onload = () => {
    ReactDOM.render(
        <Provider store={store} >
            <App />
        </Provider>,
        document.getElementById('root'));
};
