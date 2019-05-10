import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import App from '../App';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route
                path="/"
                component={App}
            />
        </Router>
    </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    liftedStore: PropTypes.objectOf(PropTypes.func).isRequired,
    replaceReducer: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    Symbol: PropTypes.func,
  }).isRequired,
};

export default Root;
