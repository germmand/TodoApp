// React
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Home Views
import homeRoutes from '../../routes/Home';

const homeViews = (
    <Switch>
        {homeRoutes.map((prop) => {
          if (prop.redirect) {
            return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
          }
          return <Route path={prop.path} component={prop.component} key={prop.key} />;
        })}
    </Switch>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class HomeLayout extends React.Component {
  state = {
    x: 'HomeLayout',
  };

  render() {
    const { classes } = this.props;
    const { x } = this.state;

    return (
            <div className={classes.container}>
                <div>
                  { x }
                </div>
                <div>
                    {homeViews}
                </div>
            </div>
    );
  }
}

HomeLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(HomeLayout);
