import './index.css';
import moment from 'moment';

const API_KEY = 'facef8942e15e4523244c4fecc91b001';
let cityName = 'San Francisco';

async function getOpenWeatherForCity(cityName, apiKey) {
  console.log(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`)
  let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`);
  response = await response.json();
  const fiveDayThreeHourForecast = response.list;
  fiveDayThreeHourForecast.forEach(weatherObj => assignWeatherDetails(weatherObj));

  function assignWeatherDetails(weatherObj) {
    const weather = {
      temp: weatherObj.main.temp,
      feelsLike: weatherObj.main.feels_like,
      condition: weatherObj.weather[0].main,
      date: weatherObj.dt_txt,
      wind: weatherObj.wind.speed,
    }

    createWeatherElement(weather);
  }

  function createWeatherElement(weather) {
    const mainWeatherContainer = document.getElementsByClassName("entire-forecast")[0];
    const dayForecast = document.createElement("div");
    const weatherDetails = document.createElement("div");
    const locationDetails = document.createElement("div");
    const temp = document.createElement("p");
    const feelsLike = document.createElement("p");
    const condition = document.createElement("p");
    const date = document.createElement("p");
    dayForecast.className="day-forecast";
    weatherDetails.className="weather-details";
    weatherDetails.appendChild(date);
    weatherDetails.appendChild(temp);
    weatherDetails.appendChild(feelsLike);
    weatherDetails.appendChild(condition);
    locationDetails.className="location-details";
    date.innerText = `${moment(weather.date).format('MMM Do YY')} \n As of ${moment(weather.date).format("LT")} : `;
    temp.textContent = weather.temp + "°";
    feelsLike.textContent = "Feels Like " + weather.feelsLike;
    condition.textContent = weather.condition + " --- " + weather.wind + " mph winds";
    date.className="date";
    temp.className="temp";
    feelsLike.className="feelsLike";
    condition.className="condition";
    dayForecast.appendChild(weatherDetails);
    dayForecast.appendChild(locationDetails);
    mainWeatherContainer.appendChild(dayForecast);
  }
}



getOpenWeatherForCity(cityName, API_KEY);

