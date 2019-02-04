import React, { Component } from "react"
import { getTownsWeathers } from '../../clients/currentWeatherClient';
import { getTowns } from '../../clients/townClient';
import Typography from '@material-ui/core/es/Typography/Typography';
import ObservableTownsPage from './ObservableTownsPage';
import TownsWeatherGrid from './TownsWeatherGrid';
import PropTypes from 'prop-types';

const TownsWeathersLoader = Children => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townsWeathers: [],
      isLoaded: false
    };
  }

  loadTownsWeathers = townIds => Promise.all([getTowns(townIds), getTownsWeathers(townIds)])
  .then(result => this.merge(result[0], result[1]))
  .then(townsWeathers =>
    this.setState({
      townsWeathers,
      isLoaded: true
    })
  );

  merge = (towns, weathers) => towns.map(t => ({
    town: t,
    weather: weathers.filter(w => w.townId === t.id)[0]
  }));

  componentDidMount() {
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  componentDidUpdate(prevProps) {
    if (isEquals(this.props.observableTownsIds, prevProps.observableTownsIds)) {
      return;
    }
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  render() {
    const { isLoaded, townsWeathers } = this.state;
    return !isLoaded ?
      <Typography variant="h4">Loading...</Typography> :
      <Children townsWeathers={townsWeathers} {...this.props}/>
  }
};

function isEquals(a, b) {
  return !a.some((e, i) => e !== b[i]);
}

TownsWeatherGrid.propTypes = {
  observableTownsIds: PropTypes.array.isRequired,
};

export default TownsWeathersLoader(ObservableTownsPage);