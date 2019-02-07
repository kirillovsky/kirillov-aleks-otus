import React from "react"
import PageContent from '../content/PageContent';
import FoundedTown from './FoundedTown';
import townsLoader from './townsLoader';
import { Grid, List, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2
  },
});

const SearchResultPage =
  ({ classes, searchString, towns = [], addHandler, removeHandler }) => (
    <PageContent title={`Search result: ${searchString}`}>
      <Centred>
        <Typography variant="h6"> Showing {towns.length} results</Typography>
        <TownsList
          className={classes.list}
          towns={towns}
          townItemFunction={town =>
            <FoundedTown
              town={town}
              addHandler={() => addHandler(town.id)}
              removeHandler={() => removeHandler(town.id)}
              key={`town - ${town.id}`}
            />
          }
        />
      </Centred>
    </PageContent>
  );

const Centred = ({ children }) => (
  <Grid container justify="center">
    <Grid item xs={6}>
      {children}
    </Grid>
  </Grid>
);

const TownsList = ({ className, towns, townItemFunction }) =>
  towns.length === 0 ? "" :
    <List className={className}>{towns.map(townItemFunction)}</List>;

SearchResultPage.propTypes = {
  classes: PropTypes.object.isRequired,
  searchString: PropTypes.string.isRequired,
  towns: PropTypes.array,
};

export default townsLoader(
  withStyles(styles)(SearchResultPage)
);