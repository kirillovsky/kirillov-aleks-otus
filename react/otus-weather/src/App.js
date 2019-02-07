import React, { Component } from 'react';
import ApplicationBar from './js/ui/bar/ApplicationBar';
import withStyles from '@material-ui/core/es/styles/withStyles';
import ObservableTownsPage from './js/ui/observableTowns/ObservableTownsPage';
import SearchResultsPage from './js/ui/search/SearchResultsPage';
import { Redirect, Route, Switch } from 'react-router-dom';

const styles = () => ({
  div: {
    position: "absolute",
    minHeight: "100%",
    minWidth: "100%",
    background: "#eeeeee"
  }
});

class App extends Component {
  state = {
    observableTownsIds: [1, 2]
  };

  removeOrAddToObservables = townId => {
    this.state.observableTownsIds.includes(townId) ?
      this.removeFromObservables(townId) :
      this.addToObservables(townId)
  };

  removeFromObservables = townId => {
    const { observableTownsIds } = this.state;
    this.setState({
      observableTownsIds: observableTownsIds.filter(id => id !== townId)
    });
  };

  addToObservables = townId => {
    const { observableTownsIds } = this.state;
    this.setState({
      observableTownsIds: observableTownsIds.concat(townId)
    });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.observableTownsIds);
    return (
      <div className={classes.div}>
        <ApplicationBar/>
        <Switch>
          <Redirect exact path="/" to="/observableTowns"/>
          <Route path="/observableTowns" render={
            props => <ObservableTownsPage
              {...props}
              observableTownsIds={this.state.observableTownsIds}
              removeFromObservablesHandler={this.removeFromObservables}
            />
          }/>
          <Route path="/search" render={
            props =>
              <SearchResultsPage
                {...props}
                observableTownsIds={this.state.observableTownsIds}
                removeOrAddToObservablesHandler={this.removeOrAddToObservables}
              />
          }/>
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);