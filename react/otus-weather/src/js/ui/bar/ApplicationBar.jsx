import React, { Fragment } from "react"
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/es/Button';
import SearchInput from './SearchInput';
import withStyles from '@material-ui/core/es/styles/withStyles';
import WbSunnyTwoTone from '@material-ui/icons/WbSunnyTwoTone';

const styles = ({ spacing }) => ({
  button: {
    marginLeft: spacing.unit,
  },
  grow: {
    flexGrow: 1
  }
});

const ApplicationBar = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Logo/>
      <ObservableTownsButton className={classes.button}/>
      <div className={classes.grow}/>
      <SearchInput placeholder="Search town..."/>
    </Toolbar>
  </AppBar>
);

const Logo = () => (
  <Fragment>
    <WbSunnyTwoTone/>
    <Typography variant="h6">Otus.Weather</Typography>
  </Fragment>
);

const ObservableTownsButton = ({ className }) => (
  <Button href="/observableTowns" className={className}>Observable towns</Button>
);

export default withStyles(styles)(ApplicationBar)