// React
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';

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

  onLoginRedirect = () => {
    const { history, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      history.replace('/auth/login');
    }
  }

  componentDidMount = () => {
    // Redirects to Login in case
    // the user is not logged in
    // on opening/rendering.
    this.onLoginRedirect();
  }

  componentDidUpdate = () => {
    // Redirects to Login in case
    // the user is not logged in
    // on action.
    this.onLoginRedirect();
  }

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
)(withStyles(styles)(HomeLayout));
