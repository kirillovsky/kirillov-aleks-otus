import React from "react"
import Grid from '@material-ui/core/es/Grid/Grid';
import TownsWeatherCard from './TownsWeatherCard';
import PropTypes from 'prop-types';

const TownsWeatherGrid = ({ townsWeathers, removeFromObservables = () => undefined }) => (
  <Grid container justify="flex-start" spacing={24}>
    {townsWeathers.map(({ town, weather }, i) => (
      <Grid key={`town-weather-${i}`} item>
        <TownsWeatherCard
          town={town}
          weather={weather}
          removeFromObservables={removeFromObservables(town.id)}
        />
      </Grid>
    ))}
  </Grid>
);

TownsWeatherGrid.propTypes = {
  townsWeathers: PropTypes.array.isRequired,
  changeFavoritesList: PropTypes.func
};

export default TownsWeatherGrid;