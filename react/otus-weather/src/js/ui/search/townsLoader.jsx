import React, { Component } from 'react'
import Typography from '@material-ui/core/es/Typography/Typography';
import { findTownByName } from '../../clients/townClient';
import PropTypes from 'prop-types';

const townsLoader = Child => class extends Component {
  state = {
    towns: [],
    isLoaded: false
  };

  componentDidMount() {
    this.loadTowns(this.props.searchString)
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchString === prevProps.searchString) {
      return;
    }
    this.loadTowns(this.props.searchString)
  }

  loadTowns = searchString => (
    findTownByName(searchString)
    .then(towns =>
      this.setState({
        towns: towns.map(
          town => ({ ...town, isObserved: this.isTownInObservables(town) })
        ),
        isLoaded: true
      })
    )
  );

  isTownInObservables = town =>
    this.props.observableTownsIds.includes(town.id);

  render() {
    const { isLoaded, towns } = this.state;
    const props = ({
      ...this.props,
      searchString: encodeURIComponent(this.props.searchString)
    });
    return !isLoaded ?
      <Typography variant="h4">Loading...</Typography> :
      <Child {...props} towns={towns}/>
  }
};

townsLoader.propTypes = {
  searchString: PropTypes.string.isRequired,
  observableTownsIds: PropTypes.array.isRequired
};

export default townsLoader;