import { getTown } from './townClient';

const currentWeather = [
  {
    townId: 1,
    title: "Drizzle",
    description: "light intensity drizzle",
    iconUrl: "http://openweathermap.org/img/w/09d.png",
    temperature: 7.17,
    pressure: 759.1,
    humidity: 81,
    visibility: 1000,
    wind: {
      speed: 4.1,
      direction: "NNE"
    },
    clouds: {
      name: "all",
      value: 90
    }
  },
  {
    townId: 2,
    title: "Cloudy",
    description: "Cloudy",
    iconUrl: "https://openweathermap.org/img/w/03d.png",
    temperature: 2.0,
    pressure: 759.1,
    humidity: 75,
    visibility: 1000,
    wind: {
      speed: 3.1,
      direction: "NW"
    },
    clouds: {
      name: "all",
      value: 100
    }
  },
  {
    townId: 3,
    title: "Partially cloudy",
    description: "Partially cloudy",
    iconUrl: "https://openweathermap.org/img/w/02d.png",
    temperature: 10.0,
    pressure: 759.1,
    humidity: 65,
    visibility: 1000,
    wind: {
      speed: 6.1,
      direction: "WNW"
    },
    clouds: {
      name: "all",
      value: 50
    }
  },
  {
    townId: 4,
    title: "Partially cloudy",
    description: "Partially cloudy",
    iconUrl: "https://openweathermap.org/img/w/02d.png",
    temperature: 10.0,
    pressure: 759.1,
    humidity: 65,
    visibility: 1000,
    wind: {
      speed: 6.1,
      direction: "SW"
    },
    clouds: {
      name: "all",
      value: 50
    }
  },
  {
    townId: 5,
    title: "Sunny",
    description: "Sunny",
    iconUrl: "https://openweathermap.org/img/w/01d.png",
    temperature: 30.0,
    pressure: 759.1,
    humidity: 55,
    visibility: 1000,
    wind: {
      speed: 2.1,
      direction: "ESE"
    }
  },
  {
    townId: 6,
    title: "Partially cloudy",
    description: "Partially cloudy",
    iconUrl: "https://openweathermap.org/img/w/02d.png",
    temperature: 20.0,
    pressure: 759.1,
    humidity: 65,
    visibility: 1000,
    wind: {
      speed: 6.1,
      direction: "SW"
    },
    clouds: {
      name: "all",
      value: 50
    }
  },
  {
    townId: 7,
    title: "Drizzle",
    description: "light intensity drizzle",
    iconUrl: "http://openweathermap.org/img/w/09d.png",
    temperature: 7.17,
    pressure: 759.1,
    humidity: 81,
    visibility: 1000,
    wind: {
      speed: 4.1,
      direction: "NNE"
    },
    clouds: {
      name: "all",
      value: 90
    }
  },
  {
    townId: 8,
    title: "Drizzle",
    description: "light intensity drizzle",
    iconUrl: "http://openweathermap.org/img/w/09d.png",
    temperature: 7.17,
    pressure: 759.1,
    humidity: 81,
    visibility: 1000,
    wind: {
      speed: 4.1,
      direction: "NNE"
    },
    clouds: {
      name: "all",
      value: 90
    }
  },
  {
    townId: 9,
    title: "Cloudy",
    description: "Cloudy",
    iconUrl: "https://openweathermap.org/img/w/03d.png",
    temperature: 10.0,
    pressure: 759.1,
    humidity: 75,
    visibility: 1000,
    wind: {
      speed: 3.1,
      direction: "NW"
    },
    clouds: {
      name: "all",
      value: 100
    }
  },
  {
    townId: 10,
    title: "Sunny",
    description: "Sunny",
    iconUrl: "https://openweathermap.org/img/w/01d.png",
    temperature: 30.0,
    pressure: 759.1,
    humidity: 55,
    visibility: 1000,
    wind: {
      speed: 2.1,
      direction: "ESE"
    }
  },
];

function getTownWeather(townId) {
  const result = currentWeather.filter(w => w.townId === townId);
  return (result.length !== 0) ?
    Promise.resolve(result[0]) :
    Promise.reject(`Not found weather for town - ${townId}`);
}

function getTownsWeathers(townsIds) {
  return Promise.all(
    townsIds.map(id => getTownWeather(id))
  );
}

export { getTownWeather, getTownsWeathers };