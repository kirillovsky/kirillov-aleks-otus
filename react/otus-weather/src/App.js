import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/es/styles';
import theme from './js/ui/theme/theme'
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

const App = ({ classes }) => (
  <MuiThemeProvider theme={theme}>
    <div className={classes.div}>
      <ApplicationBar/>
      <Switch>
        <Redirect exact path="/" to="/observableTowns"/>
        <Route path="/observableTowns" render={
          props => <ObservableTownsPage
            {...props}
            observableTownsIds={[1, 2]}
            removeFromObservablesHandler={ id => console.log("Keks - " + id)}
          />
        }/>
        <Route path="/search" render={
          props =>
            <SearchResultsPage
              {...props}
              removeOrInsertTownsHandler={id => console.log("Change id: " + id)}
            />
        }/>
      </Switch>
    </div>
  </MuiThemeProvider>
);
export default withStyles(styles)(App);