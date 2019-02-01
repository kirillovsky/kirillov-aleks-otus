import React, { Fragment } from "react"
import withStyles from '@material-ui/core/es/styles/withStyles';
import Typography from '@material-ui/core/es/Typography/Typography';

const styles = theme => ({
  container: {
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing.unit * 5,
  },
  title: {
    marginBottom: theme.spacing.unit * 4
  }
});

const PageContent = ({ classes, children, title }) => (
  <Fragment>
    <div className={classes.container}>
      <Typography className={classes.title} variant="h3">{title}</Typography>
      {children}
    </div>
  </Fragment>
);

export default withStyles(styles)(PageContent);