import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import styles from './styles';

import capitalizeFirstLetter from '../../common/functions/capitalizeFirstLetter';

const ServerAuthErrors = ({ errors, classes }) => (
    <Paper className={classes.root} elevation={1}>
        <List
            component="nav"
            subheader={
                <ListSubheader component="div">Server responded with some errors:</ListSubheader>
            }
        >
            {Object.entries(errors).map(serverErrors => (
                    <ListItem divider key={serverErrors[0]}>
                        <ListItemIcon>
                            <ErrorIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={serverErrors[0] === 'non_field_errors'
                              ? 'Credentials'
                              : capitalizeFirstLetter(serverErrors[0])
                            }
                            secondary={serverErrors[1][0]}
                        />
                    </ListItem>
            ))}
        </List>
    </Paper>
);

ServerAuthErrors.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  errors: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default withStyles(styles)(ServerAuthErrors);
