import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';

import styles from './styles';

import Actions from '../../../store/actions';

const { userActions } = Actions;

class Login extends React.Component {
    state = {
      values: {
        username: '',
        password: '',
      },
    };

    onChangeUsername = (event) => {
      const { values } = this.state;
      const { value: username } = event.target;
      this.setState({
        values: { ...values, username },
      });
    };

    onChangePassword = (event) => {
      const { values } = this.state;
      const { value: password } = event.target;
      this.setState({
        values: { ...values, password },
      });
    };

    onHandleSignIn = () => {
      const { values: { username, password } } = this.state;
      const { login } = this.props;
      login({ username, password });
    };

    render() {
      const { classes, isLogginIn } = this.props;
      const { values } = this.state;

      return (
            <Paper className={classes.root} elevation={1}>
                <form className={classes.content}>
                    <Typography variant="h5" component="h3">
                        Welcome back!
                    </Typography>
                    <Divider className={classes.topDivider} />
                    <div className={classes.fields}>
                        <TextField
                            className={classes.textField}
                            label="Username"
                            name="username"
                            type="text"
                            variant="outlined"
                            value={values.username}
                            onChange={this.onChangeUsername}
                        />
                        <TextField
                            className={classes.textField}
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={values.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    {isLogginIn ? (
                        <CircularProgress className={classes.progress} />
                    ) : (
                        <Button
                            className={classes.signInButton}
                            color="primary"
                            size="large"
                            variant="contained"
                            onClick={this.onHandleSignIn}
                        >
                            Sign in now!
                        </Button>
                    )}
                </form>
            </Paper>
      );
    }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  login: PropTypes.func.isRequired,
  isLogginIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLogginIn: state.authenticationReducer.logginIn,
});

const mapDispatchToProps = dispatch => ({
  login: ({ username, password }) => dispatch(userActions.login({ username, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login));
