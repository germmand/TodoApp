// React
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';

// Auth Views
import authRoutes from '../../routes/Auth';

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

const styles = {
  grow: {
    flexGrow: 1,
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '90vh',
  },
};

class AuthLayout extends React.Component {
    onHandleLoginRoute = () => {
      const { history, location } = this.props;
      if (location.pathname !== '/auth/login') {
        history.push('/auth/login');
      }
    };

    onHandleRegisterRoute = () => {
      const { history, location } = this.props;
      if (location.pathname !== '/auth/signup') {
        history.push('/auth/signup');
      }
    };

    onDashboardRedirect = () => {
      const { history, isLoggedIn } = this.props;
      if (isLoggedIn) {
        history.replace('/home/Dashboard');
      }
    }

    componentDidMount = () => {
      // Redirects to dashboard in case
      // the user is already logged in
      // on opening/rendering.
      this.onDashboardRedirect();
    }

    componentDidUpdate = () => {
      // Redirects to dashboard in case
      // the user is already logged in
      // on action.
      this.onDashboardRedirect();
    }

    render() {
      const { classes } = this.props;

      return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        TodoApp - Welcome!
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={this.onHandleLoginRoute}>
                        Login
                    </Button>
                    <Button color="inherit" onClick={this.onHandleRegisterRoute}>
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.viewContainer}>
                {authViews}
            </div>
        </div>
      );
    }
}

AuthLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.authenticationReducer.isLoggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(AuthLayout));
