import React from 'react';
import ReactDOM from 'react-dom';

import throttle from 'lodash/throttle';
import configureStore from './store';
import persistedStateManager from './utils/storage/persistedStateManager';

import Containers from './containers';

const { Root } = Containers;

const persistedState = persistedStateManager.loadState();
const store = configureStore(persistedState);
store.subscribe(throttle(() => {
  // Everytime the global state gets updated,
  // it'll be updated into the localStorage as well.
  persistedStateManager.saveState(store.getState());
}, 1000));

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root'),
);
