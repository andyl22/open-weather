import moment from 'moment';

async function assignWeatherElement(weather, iteration) {
  const mainWeatherContainer = document.getElementsByClassName('hourly-forecast')[0];
  const dayForecast = mainWeatherContainer.childNodes[iteration];
  const icon = dayForecast.querySelector('.weather-icon');
  const date = dayForecast.querySelector('.date');
  const feelsLike = dayForecast.querySelector('.feels-like');
  const tempText = dayForecast.querySelector('.temp p');
  const condition = dayForecast.querySelector('.condition');
  icon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  date.innerText = `${moment(weather.date).format('MMM Do YY')} \n ${moment(weather.date).format('LT')}`;
  tempText.textContent = weather.temp;
  feelsLike.innerText = `Feels Like\n ${weather.feelsLike} \n ${weather.wind} mph winds\n`;
  condition.textContent = `${weather.condition} - ${weather.conditionDetail}`;
}

function reassignTemps(tempUom) {
  const mainWeatherContainer = document.getElementsByClassName('hourly-forecast')[0];
  mainWeatherContainer.childNodes.forEach((node) => {
    console.log(node.querySelector('.temp p'));
  });
}

async function createWeatherElements() {
  const mainWeatherContainer = document.getElementsByClassName('hourly-forecast')[0];
  const dayForecast = document.createElement('div');
  const weatherDetails = document.createElement('div');
  const temp = document.createElement('div');
  const feelsLike = document.createElement('p');
  const condition = document.createElement('p');
  const date = document.createElement('p');
  const icon = document.createElement('img');
  const tempText = document.createElement('p');
  dayForecast.className = 'day-forecast';
  weatherDetails.className = 'weather-details';
  icon.className = 'weather-icon';
  date.className = 'date';
  temp.className = 'temp';
  feelsLike.className = 'feels-like';
  condition.className = 'condition';
  temp.appendChild(icon);
  temp.appendChild(tempText);
  weatherDetails.appendChild(date);
  weatherDetails.appendChild(temp);
  weatherDetails.appendChild(feelsLike);
  weatherDetails.appendChild(condition);
  dayForecast.appendChild(weatherDetails);
  mainWeatherContainer.appendChild(dayForecast);
}

export { assignWeatherElement, createWeatherElements, reassignTemps };
