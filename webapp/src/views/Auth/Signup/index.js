import React from 'react';
import PropTypes from 'prop-types';

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

class Signup extends React.Component {
    state = {
      values: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isLoading: false,
    };

    onChangeUsername = (event) => {
      const { values } = this.state;
      const { value: username } = event.target;
      this.setState({
        values: { ...values, username },
      });
    };

    onChangeEmail = (event) => {
      const { values } = this.state;
      const { value: email } = event.target;
      this.setState({
        values: { ...values, email },
      });
    };

    onChangePassword = (event) => {
      const { values } = this.state;
      const { value: password } = event.target;
      this.setState({
        values: { ...values, password },
      });
    };

    onChangeConfirmPassword = (event) => {
      const { values } = this.state;
      const { value: confirmPassword } = event.target;
      this.setState({
        values: { ...values, confirmPassword },
      });
    };

    onHandleSignup = () => {
      // This is temporary
      // Just to check that the CircularProgress is
      // being rendered properly.
      this.setState({
        isLoading: true,
      });
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 1500);
    };

    render() {
      const { classes } = this.props;
      const { values, isLoading } = this.state;

      return (
            <Paper className={classes.root} elevation={1}>
                <form className={classes.content}>
                    <Typography variant="h5" component="h3">
                        Hello, there!
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
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={values.email}
                            onChange={this.onChangeEmail}
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
                        <TextField
                            className={classes.textField}
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            value={values.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                        />
                    </div>
                    {isLoading ? (
                        <CircularProgress className={classes.progress} />
                    ) : (
                        <Button
                            className={classes.signInButton}
                            color="primary"
                            size="large"
                            variant="contained"
                            onClick={this.onHandleSignup}
                        >
                            Sign up now!
                        </Button>
                    )}
                </form>
            </Paper>
      );
    }
}

Signup.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Signup);
