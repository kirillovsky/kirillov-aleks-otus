import React from "react"
import withStyles from '@material-ui/core/es/styles/withStyles';

const styles = theme => ({
  container: {
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2,
    paddingTop: theme.spacing.unit * 7,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  }
});

const PageContent = ({ classes, children }) => (
  <div className={classes.container}>
    {children}
  </div>
);

export default withStyles(styles)(PageContent);