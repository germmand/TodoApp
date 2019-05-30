export default theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 485,
    backgroundColor: theme.palette.danger !== undefined ? theme.palette.danger.main : '#ED4740',
  },
});
