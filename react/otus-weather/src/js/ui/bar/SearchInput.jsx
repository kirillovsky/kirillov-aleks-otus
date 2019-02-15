import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/es/styles/colorManipulator';
import PropTypes from 'prop-types';

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
    width: theme.spacing.unit * 4,
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
    paddingLeft: theme.spacing.unit * 4,
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 200,
    },
  },
});

class SearchInput extends Component {
  render() {
    const { classes, placeholder } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <InputBase
          onKeyDown={this.onEnter}
          placeholder={placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }

  onEnter = ({ key, target }) => key === 'Enter' && this.sendSearchString(target.value);

  sendSearchString = searchString => {
    this.props.history.push(`/search?townName=${encodeURIComponent(searchString)}`);
  };
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
};

export default withStyles(styles)(SearchInput);