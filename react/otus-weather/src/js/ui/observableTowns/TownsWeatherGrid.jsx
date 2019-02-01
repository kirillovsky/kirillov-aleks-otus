import React from "react"
import Grid from '@material-ui/core/es/Grid/Grid';
import TownWeatherCard from './TownWeatherCard';
import PropTypes from 'prop-types';

const TownsWeatherGrid = ({ townsWeather, removeFromObservables = () => undefined }) => (
  <Grid container justify="flex-start" spacing={24}>
    {townsWeather.map(({ town, weather }, i) => (
      <Grid key={`town-weather-${i}`} item>
        <TownWeatherCard
          town={town}
          weather={weather}
          removeFromObservables={removeFromObservables(town.id)}
        />
      </Grid>
    ))}
  </Grid>
);

TownsWeatherGrid.propTypes = {
  townsWeather: PropTypes.array.isRequired,
  changeFavoritesList: PropTypes.func
};

export default TownsWeatherGrid;