import React, { Component } from "react"
import withStyles from '@material-ui/core/es/styles/withStyles';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction';
import TownAction from '../buttons/TownAction';

const styles = theme => ({
  item: {
    margin: theme.spacing.unit
  },
  action: {
    marginRight: theme.spacing.unit * 5
  }
});

//todo: МБ стейт хранить и не придется
class TownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isObserved: props.town.isFavorite
    };
  }

  turnObserved = action => {
    action();
    this.setState({isObserved: !this.state.isObserved})
  };

  render() {
    const { classes, town, onChange, key } = this.props;
    const { name, country } = town;
    return (
      <ListItem className={classes.item} key={key}>
        <ListItemText primaryTypographyProps={{ variant: "h5" }} primary={`${name} (${country})`}/>
        <ListItemSecondaryAction>
          <TownAction
            className={classes.action}
            isObservable={this.state.isObserved}
            size="small"
            action={() => this.turnObserved(onChange)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles)(TownItem);