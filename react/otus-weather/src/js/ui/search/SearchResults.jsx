import React from "react"
import withStyles from '@material-ui/core/es/styles/withStyles';
import PageContent from '../content/PageContent';
import Typography from '@material-ui/core/es/Typography/Typography';
import List from '@material-ui/core/es/List/List';
import Grid from '@material-ui/core/es/Grid/Grid';
import TownItem from './TownItem';

const styles = theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2
  },
});

const SearchResult = ({ classes, searchString, towns = [], removeOrInsertToObservables = f => f }) => (
  <PageContent title={`Search result: ${searchString}`}>
    <Centred>
      <SearchResultCount count={towns.length}/>
      <TownsList
        className={classes.list}
        towns={towns}
        townItemFunction={town =>
          <TownItem
            town={town}
            onChange={() => removeOrInsertToObservables(town.id)}
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

const TownsList = ({ className, towns, townItemFunction }) => {
  if (towns.length === 0) return "";

  return <List className={className}>
    {towns.map(townItemFunction)}
  </List>
};

const SearchResultCount = ({ count }) => (
  <Typography variant="h6">Showing {count} results</Typography>
);

export default withStyles(styles)(SearchResult);