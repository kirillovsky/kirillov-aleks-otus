import React, { Fragment } from "react"
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

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

PageContent.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(PageContent);