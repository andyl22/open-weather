import { Loader } from '@googlemaps/js-api-loader';
import { createWeatherElements, assignWeatherElement, setTempUom } from './createWeatherElement';

const positionStackAPIKey = 'b3950d120c0d2d41174eb990321f4389';
const openWeatherAPIKey = 'facef8942e15e4523244c4fecc91b001';
let geocoder;

async function getWeatherForecast(latLong) {
  const [lat, long] = latLong;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${openWeatherAPIKey}&units=imperial`,
    { mode: 'cors' },
  );
  try {
    response = response.json();
    return response;
  } catch (error) {
    throw new Error(400);
  }
}

async function getLatLongPositionStack(locationQuery) {
  let response = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${positionStackAPIKey}&query=${locationQuery}`,
    { mode: 'cors' },
  );
  try {
    response = await response.json();
    return [response.data[0].latitude, response.data[0].longitude];
  } catch (error) {
    throw new Error(400);
  }
}

// function getLocationDetails(locationQuery) {
//   return geocoder.geocode({ address: locationQuery });
// }

// async function getLatLong() {
//   const latLong = await getLocationDetails('583 Silver Avenue San Francisco California',);
//   return [
//     latLong.results[0].geometry.location.lat(),
//     latLong.results[0].geometry.location.lng(),
//   ];
// }

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

function enableListeners() {
  document.querySelector('.temp-uom').childNodes[0].addEventListener('click', setTempUom);
  document.querySelector('.temp-uom').childNodes[1].addEventListener('click', setTempUom);
}

async function getOpenWeatherForCity() {
  const latLong = await getLatLongPositionStack('San Francisco, CA'); // positionStack for testing
  // const latLong = await getLatLong(); // google API costs
  const weatherParent = await getWeatherForecast(latLong);
  for (let i = 1; i < weatherParent.hourly.length; i += 1) {
    weatherParseObj(weatherParent.hourly[i])
      .then(createWeatherElements())
      .then((parsedWeatherObj) => assignWeatherElement(parsedWeatherObj, i, false));
  }
  enableListeners();
}

function loadScript() {
  const loader = new Loader({
    apiKey: 'AIzaSyCV5Mobc-ukMVdPCHMBPYUg8HTLitaHsls',
    version: 'weekly',
  });

  loader.load().then(() => {
    geocoder = new google.maps.Geocoder();
    console.log('Done Loading');
    getOpenWeatherForCity();
  });
}

export { loadScript, getOpenWeatherForCity };
