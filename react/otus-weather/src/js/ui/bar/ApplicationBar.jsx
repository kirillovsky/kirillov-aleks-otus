import React, { Fragment } from "react"
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/es/Button';
import SearchInput from './SearchInput';
import withStyles from '@material-ui/core/es/styles/withStyles';
import WbSunnyTwoTone from '@material-ui/icons/WbSunnyTwoTone';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = ({ spacing }) => ({
  button: {
    marginLeft: spacing.unit,
  },
  grow: {
    flexGrow: 1
  }
});

const ApplicationBar = ({ classes, ...rest }) => (
  <AppBar position="static">
    <Toolbar>
      <Logo/>
      <ObservableTownsButton {...rest} className={classes.button}/>
      <div className={classes.grow}/>
      <SearchInput {...rest} placeholder="Search town..."/>
    </Toolbar>
  </AppBar>
);

const Logo = () => (
  <Fragment>
    <WbSunnyTwoTone/>
    <Typography variant="h6">Otus.Weather</Typography>
  </Fragment>
);

const ObservableTownsButton = ({ className, history }) => (
  <Button
    className={className}
    onClick={() => history.push("/observableTowns")}
  >Observable towns</Button>
);

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  withStyles(styles)(ApplicationBar)
);