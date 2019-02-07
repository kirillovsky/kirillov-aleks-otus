import React from "react"
import { Grid } from '@material-ui/core';
import TownsWeatherCard from './TownsWeatherCard';
import PropTypes from 'prop-types';

const TownsWeatherGrid = ({ townsWeathers, removeHandler = () => undefined }) => (
  <Grid container justify="flex-start" spacing={24}>
    {townsWeathers.map(({ town, weather }, i) => (
      <Grid key={`town-weather-${i}`} item>
        <TownsWeatherCard
          town={town}
          weather={weather}
          removeHandler={() => removeHandler(town.id)}
        />
      </Grid>
    ))}
  </Grid>
);

TownsWeatherGrid.propTypes = {
  townsWeathers: PropTypes.array.isRequired,
  removeHandler: PropTypes.func
};

export default TownsWeatherGrid;