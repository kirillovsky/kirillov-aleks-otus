import React, { Fragment } from "react"
import { Avatar, Card, CardActions, CardContent, CardHeader, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import LikeTownButton from '../buttons/LikeTownButton';

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

const TownsWeatherCard = ({ classes, town, weather, ...rest }) => (
  <Card className={classes.card}>
    <Header
      town={town}
      weatherIconUrl={weather.iconUrl}
      classes={classes}
    />
    <Content
      weather={weather}
      classes={classes}
      {...rest}
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

const Content = ({ classes, weather, removeHandler }) => {
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
        <LikeTownButton
          isObservable
          className={classes.fab}
          removeHandler={removeHandler}
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

TownsWeatherCard.propTypes = {
  classes: PropTypes.object.isRequired,
  town: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
};

export default withStyles(styles)(TownsWeatherCard);