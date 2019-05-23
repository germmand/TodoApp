import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styles from './styles';

import Actions from '../../../store/actions';

const { userActions } = Actions;

class Dashboard extends React.Component {
    onHandleLogout = () => {
      const { logout } = this.props;
      logout();
    };

    render() {
      const { classes } = this.props;

      return (
            <div className={classes.root}>
                <h3>Hello from Dashboard!</h3>
                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={this.onHandleLogout}
                >
                    Sign out now!
                </Button>
            </div>
      );
    }
}

Dashboard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userActions.logout()),
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Dashboard));
