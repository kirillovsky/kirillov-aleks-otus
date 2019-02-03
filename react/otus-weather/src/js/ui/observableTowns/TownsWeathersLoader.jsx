import React, { Component } from "react"
import { getTownsWeathers } from '../../clients/currentWeatherClient';
import { getTowns } from '../../clients/townClient';
import { getTownsWeathers } from '../../clients/currentWeatherClient';
import Typography from '@material-ui/core/es/Typography/Typography';
import ObservableTownsPage from './ObservableTownsPage';

const TownsWeathersLoader = Children => class extends Component {
  getDerivedStateFromProps() {
    this.state = {
      townsWeathers: [],
      isLoaded: false
    };
  }

  loadTownsWeathers = townIds => Promise.all(getTowns(townIds), getTownsWeathers(townIds))
  .then(result => this.merge(result[0], result[1]))
  .then(townsWeathers =>
    this.setState({
      townsWeathers,
      isLoaded: true
    })
  );

  merge = (towns, weathers) => towns.map(({ id }) =>
    weathers.find(w => w.townId === id)[0]
  );

  componentDidMount() {
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  componentDidUpdate() {
    this.loadTownsWeathers(this.props.observableTownsIds)
  }

  render() {
    const { isLoaded, townsWeathers } = this.state;
    return !isLoaded ?
      <Typography variant="h4">Loading...</Typography> :
      <Children townsWeathers={townsWeathers} {...this.props}/>
  }
};

export default TownsWeathersLoader(ObservableTownsPage);