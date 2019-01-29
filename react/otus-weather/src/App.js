import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/es/styles';
import theme from './js/theme/theme'
import ApplicationBar from './js/ui/bar/ApplicationBar';
import withStyles from '@material-ui/core/es/styles/withStyles';
import PageContent from './js/ui/content/PageContent';
import TownCard from './js/ui/cards/TownCard';

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
      <PageContent>
        <TownCard
          town={london()}
        />
      </PageContent>
    </div>
  </MuiThemeProvider>
);

const london = () => ({
  name: "London",
  country: "GB",
  weather: {
    title: "Drizzle",
    description: "light intensity drizzle",
    iconUrl: "http://openweathermap.org/img/w/09d.png"
  },
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
});

export default withStyles(styles)(App);