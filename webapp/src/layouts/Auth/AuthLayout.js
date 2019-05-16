import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import authRoutes from '../../routes/auth';

const authViews = (
    <Switch>
        {authRoutes.map((prop) => {
          if (prop.redirect) {
            return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
          }
          return <Route path={prop.path} component={prop.component} key={prop.key} />;
        })}
    </Switch>
);

const AuthLayout = () => (
    <div>
        <h2>
            Hey, there! From AuthLayout! :D
        </h2>
        <hr />
        <div>
            {authViews}
        </div>
    </div>
);

export default AuthLayout;
