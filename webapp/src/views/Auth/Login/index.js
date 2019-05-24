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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

import debounce from 'lodash/debounce';
import validate from 'validate.js';

import styles from './styles';
import schema from './schema';

import Actions from '../../../store/actions';

const { userActions } = Actions;

class Login extends React.Component {
    state = {
      values: {
        username: '',
        password: '',
      },
      touched: {
        username: false,
        password: false,
      },
      errors: {
        // These are client-side errors.
        // Server-side errors are handled through Redux.
        username: null,
        password: null,
      },
      wasSubmitted: false,
    };

    onValidateForm = debounce(() => {
      const { values } = this.state;
      const newState = { ...this.state };
      const errors = validate(values, schema);
      newState.errors = errors || {};
      this.setState(newState);
    }, 300);

    onChangeField = (field, value) => {
      const newState = { ...this.state };
      newState.values[field] = value;
      newState.touched[field] = true;
      this.setState(newState, this.onValidateForm);
    };

    onHandleSignIn = () => {
      const { values: { username, password } } = this.state;
      const { login } = this.props;
      login({ username, password })
        .then(() => {
          this.setState({
            wasSubmitted: true,
          });
        });
    };

    render() {
      const { classes, isLogginIn, authError } = this.props;
      const {
        values, touched, errors, wasSubmitted,
      } = this.state;

      const showUsernameErrors = touched.username && errors.username;
      const showPasswordErrors = touched.password && errors.password;

      return (
        <Paper className={classes.root} elevation={1}>
            { wasSubmitted && (
                <Paper className={classes.serverErrorsContainer} elevation={1}>
                    <List component="nav" subheader={<ListSubheader component="div">Server responded with some errors:</ListSubheader>}>
                        {Object.entries(authError).map(serverErrors => (
                                <ListItem key={serverErrors[0]}>
                                    <ListItemIcon>
                                        <ErrorIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={serverErrors[0] === 'non_field_errors' ? 'Credentials' : serverErrors[0]}
                                        secondary={serverErrors[1][0]}
                                    />
                                </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
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
                        onChange={event => this.onChangeField('username', event.target.value)}
                    />
                    { showUsernameErrors && (
                        <Typography
                            className={classes.fieldError}
                            variant="body2">
                            {errors.username[0]}
                        </Typography>
                    )}
                    <TextField
                        className={classes.textField}
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={values.password}
                        onChange={event => this.onChangeField('password', event.target.value)}
                    />
                    { showPasswordErrors && (
                        <Typography
                            className={classes.fieldError}
                            variant="body2">
                            {errors.password[0]}
                        </Typography>
                    )}
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
  authError: PropTypes.objectOf(PropTypes.array),
};
Login.defaultProps = {
  authError: null,
};

const mapStateToProps = state => ({
  isLogginIn: state.authenticationReducer.logginIn,
  authError: state.authenticationReducer.authError,
});

const mapDispatchToProps = dispatch => ({
  login: ({ username, password }) => dispatch(userActions.login({ username, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login));
