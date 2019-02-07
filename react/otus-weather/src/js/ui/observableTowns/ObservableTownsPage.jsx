import React from "react"
import TownsWeatherGrid from './TownsWeatherGrid';
import PageContent from '../content/PageContent';
import PropTypes from 'prop-types';
import townsWeathersLoader from './townsWeathersLoader';

const ObservableTownsPage = ({ townsWeathers, removeFromObservablesHandler = f => f }) => (
  <PageContent title="Observable Towns">
    {console.log("Render ObservableTownsPage" + JSON.stringify(townsWeathers))}
    <TownsWeatherGrid
      townsWeathers={townsWeathers}
      removeFromObservablesHandler={removeFromObservablesHandler}
    />
  </PageContent>
);

ObservableTownsPage.propTypes = {
  townsWeathers: PropTypes.array.isRequired,
  removeFromObservablesHandler: PropTypes.func
};

export default townsWeathersLoader(ObservableTownsPage);