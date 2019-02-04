import React, { Component } from "react"
import { getTownsWeathers } from '../../clients/currentWeatherClient';
import { getTowns } from '../../clients/townClient';
import Typography from '@material-ui/core/es/Typography/Typography';
import PropTypes from 'prop-types';

const townsWeathersLoader = Child => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townsWeathers: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  componentDidUpdate(prevProps) {
    if (isEquals(this.props.observableTownsIds, prevProps.observableTownsIds)) {
      return;
    }
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  loadTownsWeathers = townIds => Promise.all([getTowns(townIds), getTownsWeathers(townIds)])
  .then(result => mergeTownsAndWeather(result[0], result[1]))
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

function isEquals(a, b) {
  return !a.some((e, i) => e !== b[i]);
}

function mergeTownsAndWeather(towns, weathers) {
  return towns.map(
    town => ({
      town: town,
      weather: weathers.filter(weather => weather.townId === town.id)[0]
    })
  );
}

townsWeathersLoader.propTypes = {
  observableTownsIds: PropTypes.array.isRequired,
};

export default townsWeathersLoader;