import React from "react"
import Card from '@material-ui/core/es/Card/Card';
import CardHeader from '@material-ui/core/es/CardHeader/CardHeader';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import Fab from '@material-ui/core/es/Fab/Fab';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = theme => ({
  card: {
    borderRadius: theme.shape.borderRadius * 2
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  headerTitle: {
    fontSize: "1.125em",
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit * 5,
  }
});

const TownCard = ({ classes, town }) => (
  <Card className={classes.card}>
    <TownCardHeader
      town={town}
      classes={classes}
    />
    <TownCardContent
      town={town}
      classes={classes}
    />
  </Card>
);

const TownCardHeader = ({ town, classes }) => {
  const {
    name,
    country,
    weather: { iconUrl } = {}
  } = town;
  return (
    <CardHeader
      title={`${name} (${country})`}
      avatar={<Avatar alt="N/A" src={iconUrl}/>}
      classes={{
        root: classes.header,
        title: classes.headerTitle
      }}
    />
  );
};

const TownCardContent = ({ classes, town }) => {
  const {
    temperature,
    humidity,
    visibility,
    weather,
    wind,
    clouds,
    isFavorite
  } = town;
  return (
    <CardContent>
      <div>
        {textField("Weather", `${weather.title} (${weather.description})`)}
        {textField("Temperature", (temperature) ? `${temperature.toFixed(2)} C\u00B0` : "N/A")}
        {textField("Humidity", (humidity) ? `${humidity.toFixed(1)}%` : "N/A")}
        {textField("Visibility", (visibility) ? `${visibility} m.` : "N/A")}
        {textField("Wind", (wind) ? `${wind.speed} m/s, ${wind.direction}` : "N/A")}
        {textField("Cloud", (clouds) ? `${clouds.name}(${clouds.value}%)` : "N/A")}
      </div>
      <ActionsWithFavorites
        isFavorite={isFavorite}
        classes={classes}
      />
    </CardContent>
  );
};

const textField = (title, data) => (
  <div>
    <b>{`${title}:`}</b> {data}
  </div>
);

const ActionsWithFavorites = ({ classes, isFavorite, addHandler = f => f, removeHandler = f => f }) => (
  <Fab onClick={() => (isFavorite) ? addHandler() : removeHandler()}
       aria-label="Favorites actions"
       color="primary"
       className={classes.fab}>
    {(isFavorite) ? <Favorite/> : <FavoriteBorder/>}
  </Fab>
);

export default withStyles(styles)(TownCard);