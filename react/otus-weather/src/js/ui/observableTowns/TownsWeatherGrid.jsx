import React from "react"
import Grid from '@material-ui/core/es/Grid/Grid';
import TownsWeatherCard from './TownsWeatherCard';
import PropTypes from 'prop-types';

const TownsWeatherGrid = ({ townsWeathers, removeFromObservablesHandler = () => undefined }) => (
  <Grid container justify="flex-start" spacing={24}>
    {townsWeathers.map(({ town, weather }, i) => (
      <Grid key={`town-weather-${i}`} item>
        <TownsWeatherCard
          town={town}
          weather={weather}
          removeFromObservablesHandler={() => removeFromObservablesHandler(town.id)}
        />
      </Grid>
    ))}
  </Grid>
);

TownsWeatherGrid.propTypes = {
  townsWeathers: PropTypes.array.isRequired,
  removeFromObservablesHandler: PropTypes.func
};

export default TownsWeatherGrid;