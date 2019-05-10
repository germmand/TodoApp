import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';

import Containers from './containers';

const store = configureStore();
const { Root } = Containers;

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root'),
);
