import React from "react";
import queryString  from 'query-string'

const receiveSearchString = Child => ({ location, ...rest }) => (
  <Child
    {...rest}
    searchString={queryString.parse(location.search).townName}
  />
);

export default receiveSearchString;