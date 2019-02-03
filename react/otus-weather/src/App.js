import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/es/styles';
import theme from './js/ui/theme/theme'
import ApplicationBar from './js/ui/bar/ApplicationBar';
import withStyles from '@material-ui/core/es/styles/withStyles';
import SearchResult from './js/ui/search/SearchResults';

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
      {/*<ObservableTownsPage townsWeather={Array(2).fill(london())}/>*/}
      <SearchResult
        searchString="Kek"
        towns={Array(5).fill(london().town)}
        removeOrInsertToObservables={id => console.log("Change id: " + id)}
      />
    </div>
  </MuiThemeProvider>
);

const london = () => ({
  town: {
    id: 1,
    country: "GB",
    name: "London",
    isFavorite: true,
  },
  weather: {
    townId: 1,
    title: "Drizzle",
    description: "light intensity drizzle",
    iconUrl: "http://openweathermap.org/img/w/09d.png",
    temperature: 7.17,
    pressure: 759.1,
    humidity: 81,
    visibility: 1000,
    wind: {
      speed: 4.1,
      direction: "NNE"
    },
    clouds: {
      name: "all",
      value: 90
    }
  },
});

export default withStyles(styles)(App);