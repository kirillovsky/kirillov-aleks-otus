import React from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
import InputBase from '@material-ui/core/es/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.55),
    },
    marginLeft: theme.spacing.unit,
    width: 'auto',
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 200,
    },
  },
});

const SearchInput = ({ classes, placeholder }) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon/>
    </div>
    <InputBase
      placeholder={placeholder}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
    />
  </div>
);

export default withStyles(styles)(SearchInput);