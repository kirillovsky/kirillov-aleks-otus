import queryString from 'query-string'

function searchString(location) {
  return queryString.parse(location.search).townName;
}

export default searchString;