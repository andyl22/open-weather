import { createWeatherElements, assignWeatherElement } from './createWeatherElement';

const positionStackAPIKey = 'b3950d120c0d2d41174eb990321f4389';
const openWeatherAPIKey = 'facef8942e15e4523244c4fecc91b001';

async function getLatLong(locationQuery) {
  let response = await fetch(`https://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${locationQuery}`, { mode: 'cors' });
  try {
    response = await response.json();
    return [response.data[0].latitude, response.data[0].longitude];
  } catch (error) {
    throw new Error(400);
  }
}

async function getWeatherForecast(latLong) {
  const [lat, long] = latLong;
  let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${openWeatherAPIKey}`, { mode: 'cors' });
  try {
    response = response.json();
    return response;
  } catch (error) {
    throw new Error(400);
  }
}

async function weatherParseObj(weatherObj) {
  const weather = {
    temp: weatherObj.temp,
    feelsLike: weatherObj.feels_like,
    condition: weatherObj.weather[0].main,
    conditionDetail: weatherObj.weather[0].description,
    date: new Date(weatherObj.dt * 1000),
    wind: weatherObj.wind_speed,
    icon: weatherObj.weather[0].icon,
  };
  return weather;
}

async function getOpenWeatherForCity() {
  return getLatLong('San Francisco, California')
    .then((latLong) => getWeatherForecast(latLong))
    .then((weatherParent) => {
      for (let i = 1; i < weatherParent.hourly.length; i += 1) {
        weatherParseObj(weatherParent.hourly[i])
          .then(createWeatherElements())
          .then((parsedWeatherObj) => assignWeatherElement(parsedWeatherObj, i));
      }
    })
    .catch((error) => alert(error.message));
}

export default getOpenWeatherForCity;
