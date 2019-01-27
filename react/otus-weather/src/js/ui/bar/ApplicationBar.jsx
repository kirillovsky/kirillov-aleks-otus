import React from "react"
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/es/Button';
import withStyles from '@material-ui/core/es/styles/withStyles';
import SearchInput from './SearchInput';


const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  }
});

const ApplicationBar = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Otus.Weather</Typography>
      <Button className={classes.button}>Избранное</Button>
      <Grow className={classes.grow}/>
      <SearchInput placeholder="Search town..."/>
    </Toolbar>
  </AppBar>
);

const Grow = ({ className }) => <div className={className}/>;

export default withStyles(styles)(ApplicationBar)