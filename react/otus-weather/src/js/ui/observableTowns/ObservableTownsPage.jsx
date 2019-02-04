import React from "react"
import TownsWeatherGrid from './TownsWeatherGrid';
import PageContent from '../content/PageContent';
import PropTypes from 'prop-types';

const ObservableTownsPage = ({ townsWeathers, removeFromObservables = f => f }) => (
  <PageContent title="Observable Towns">
    <TownsWeatherGrid
      townsWeathers={townsWeathers}
      removeFromObservables={removeFromObservables}
    />
  </PageContent>
);

ObservableTownsPage.propTypes = {
  townsWeathers: PropTypes.array.isRequired,
  removeFromObservables: PropTypes.func
};

export default ObservableTownsPage;