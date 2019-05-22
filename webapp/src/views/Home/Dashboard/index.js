import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './styles';

class Dashboard extends React.Component {
    onHandleLogout = () => {
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
};

export default withStyles(styles)(Dashboard);
