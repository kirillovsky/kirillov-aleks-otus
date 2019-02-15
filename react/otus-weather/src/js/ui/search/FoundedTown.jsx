import React, { Component } from "react"
import { ListItem, ListItemSecondaryAction, ListItemText, withStyles } from '@material-ui/core';
import LikeTownButton from '../buttons/LikeTownButton';
import PropTypes from 'prop-types';

const styles = theme => ({
  item: {
    margin: theme.spacing.unit
  },
  action: {
    marginRight: theme.spacing.unit * 5
  }
});

class FoundedTown extends Component {
  state = {
    isObserved: this.props.town.isObserved
  };

  turnObserved = action => {
    action();
    this.setState({ isObserved: !this.state.isObserved })
  };

  render() {
    const { classes, town, addHandler = f => f, removeHandler = f => f } = this.props;
    const { name, country } = town;
    return (
      <ListItem className={classes.item}>
        <ListItemText
          primaryTypographyProps={{ variant: "h5" }}
          primary={`${name} (${country})`}
        />
        <ListItemSecondaryAction>
          <LikeTownButton
            className={classes.action}
            isObservable={this.state.isObserved}
            size="small"
            addHandler={() => this.turnObserved(addHandler)}
            removeHandler={() => this.turnObserved(removeHandler)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

FoundedTown.propTypes = {
  classes: PropTypes.object.isRequired,
  town: PropTypes.object.isRequired,
  addHandler: PropTypes.func,
  removeHandler: PropTypes.func,
};

export default withStyles(styles)(FoundedTown);