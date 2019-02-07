import React from "react"
import TownsWeatherGrid from './TownsWeatherGrid';
import PageContent from '../content/PageContent';
import PropTypes from 'prop-types';
import townsWeathersLoader from './townsWeathersLoader';

const ObservableTownsPage = ({ townsWeathers, removeHandler = f => f }) => (
  <PageContent title="Observable Towns">
    <TownsWeatherGrid
      townsWeathers={townsWeathers}
      removeHandler={removeHandler}
    />
  </PageContent>
);

ObservableTownsPage.propTypes = {
  townsWeathers: PropTypes.array.isRequired,
  removeHandler: PropTypes.func
};

export default townsWeathersLoader(ObservableTownsPage);