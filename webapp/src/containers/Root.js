import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import indexRoutes from '../routes';

// I'm going to leave this here
// just in case I want to change it.
const theme = createMuiTheme();

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    {indexRoutes.map((prop) => {
                      if (prop.redirect) {
                        return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
                      }
                      return <Route path={prop.path} component={prop.component} key={prop.key} />;
                    })}
                </Switch>
            </Router>
        </MuiThemeProvider>
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
