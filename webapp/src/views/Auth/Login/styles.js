export default theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
    '& + &': {
      marginTop: theme.spacing.unit * 2,
    },
  },
  fields: {
    marginTop: theme.spacing.unit * 2,
    width: 500,
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
  },
  topDivider: {
    width: '75%',
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
