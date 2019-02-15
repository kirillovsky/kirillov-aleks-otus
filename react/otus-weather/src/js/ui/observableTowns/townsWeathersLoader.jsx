import React, { Component } from "react"
import { getTownsWeathers } from '../../clients/currentWeatherClient';
import { getTowns } from '../../clients/townClient';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const townsWeathersLoader = Child => class extends Component {
  static propTypes = {
    observableTownsIds: PropTypes.array.isRequired,
  };

  state = {
    townsWeathers: [],
    isLoaded: false
  };

  componentDidMount() {
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  componentDidUpdate(prevProps) {
    if (this.props.observableTownsIds === prevProps.observableTownsIds) {
      return;
    }
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  loadTownsWeathers = townIds => Promise.all([getTowns(townIds), getTownsWeathers(townIds)])
  .then(result => mergeTownsAndWeather(...result))
  .then(townsWeathers =>
    this.setState({
      townsWeathers,
      isLoaded: true
    })
  );

  render() {
    const { isLoaded, townsWeathers } = this.state;
    const props = ({ ...this.props, townsWeathers });
    return !isLoaded ?
      <Typography variant="h4">Loading...</Typography> :
      <Child {...props}/>
  }
};

function mergeTownsAndWeather(towns, weathers) {
  return towns.map(
    town => ({
      town: town,
      weather: weathers.filter(weather => weather.townId === town.id)[0]
    })
  );
}

export default townsWeathersLoader;