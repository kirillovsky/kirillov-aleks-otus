import React, { Fragment } from "react"
import Card from '@material-ui/core/es/Card/Card';
import CardHeader from '@material-ui/core/es/CardHeader/CardHeader';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import TownAction from '../buttons/TownAction';

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
  action: {
    display: "flex"
  },
  fab: {
    position: 'relative',
    marginLeft: "auto",
  },
  content: {
    marginBottom: theme.spacing.unit * -7
  }
});

const TownWeatherCard = ({ classes, town, weather, removeFromObservables = f => f }) => (
  <Card className={classes.card}>
    <Header
      town={town}
      weatherIconUrl={weather.iconUrl}
      classes={classes}
    />
    <Content
      weather={weather}
      isFavorite={town.isFavorite}
      classes={classes}
      removeFromObservables={removeFromObservables}
    />
  </Card>
);

const Header = ({ classes, town, weatherIconUrl }) => (
  <CardHeader
    title={`${town.name} (${town.country})`}
    avatar={<Avatar alt="N/A" src={weatherIconUrl}/>}
    classes={{
      root: classes.header,
      title: classes.headerTitle
    }}
  />
);

const Content = ({ classes, weather, removeFromObservables }) => {
  const {
    temperature,
    humidity,
    visibility,
    title,
    description,
    wind,
    clouds,
  } = weather;
  return (
    <Fragment>
      <CardContent className={classes.content}>
        {textField("Weather", `${title} (${description})`)}
        {textField("Temperature", (temperature) ? `${temperature.toFixed(2)} C\u00B0` : "N/A")}
        {textField("Humidity", (humidity) ? `${humidity.toFixed(1)}%` : "N/A")}
        {textField("Visibility", (visibility) ? `${visibility} m.` : "N/A")}
        {textField("Wind", (wind) ? `${wind.speed} m/s, ${wind.direction}` : "N/A")}
        {textField("Cloud", (clouds) ? `${clouds.name}(${clouds.value}%)` : "N/A")}
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <TownAction
          isFavorite
          className={classes.fab}
          action={removeFromObservables}
        />
      </CardActions>
    </Fragment>
  );
};

const textField = (title, data) => (
  <div>
    <b>{`${title}:`}</b> {data}
  </div>
);

TownWeatherCard.propTypes = {
  classes: PropTypes.object.isRequired,
  town: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
  changeFavoritesList: PropTypes.func
};

export default withStyles(styles)(TownWeatherCard);