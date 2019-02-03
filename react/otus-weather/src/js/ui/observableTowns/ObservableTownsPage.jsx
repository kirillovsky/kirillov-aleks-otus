import React, { Component } from "react"
import TownsWeatherGrid from './TownsWeatherGrid';
import PageContent from '../content/PageContent';

const ObservableTownsPage = ({ townsWeather, removeFromObservables = f => f }) => (
  <PageContent title="Observable Towns">
    <TownsWeatherGrid
      townsWeather={townsWeather}
      removeFromObservables={removeFromObservables}
    />
  </PageContent>
);

export default ObservableTownsPage;