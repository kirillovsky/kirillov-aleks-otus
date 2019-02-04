import React, { Component } from 'react'
import Typography from '@material-ui/core/es/Typography/Typography';
import { findTownByName } from '../../clients/townClient';

const townsLoader = Child => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      towns: [],
      isLoaded: false
    };
  }

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
        towns,
        isLoaded: true
      })
    )
  );

  render() {
    const { isLoaded, towns } = this.state;
    const props = ({
      ...this.props,
      searchString: encodeURIComponent(this.props.searchString)
    });
    return !isLoaded ?
      <Typography variant="h4">Loading...</Typography> :
      <Child towns={towns} {...props}/>
  }
};

export default townsLoader;