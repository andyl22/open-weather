import moment from 'moment';

let tempUom = 'farenheit';

function convertTemps(temp) {
  if (tempUom === 'celsius') {
    return Math.round((temp - 32) * (5 / 9) * 100) / 100;
  }
  return Math.round(((temp * 1.8) + 32) * 100) / 100;
}

function reassignTemps() {
  const allTemperatureContent = document.querySelectorAll('.temp p');
  allTemperatureContent.forEach((temp) => {
    temp.textContent = convertTemps(temp.textContent);
  });
}

function setTempUom(e) {
  if (tempUom === e.target.id) {
    return;
  }
  e.path[1].childNodes.forEach((node) => {
    if (node.id !== e.target.id) {
      node.classList.remove('active');
    }
  });
  tempUom = e.target.id;
  e.target.classList.add('active');
  reassignTemps(tempUom);
}

async function assignWeatherElement(weather, iteration, convertTemp = true) {
  const mainWeatherContainer = document.getElementsByClassName('hourly-forecast')[0];
  const dayForecast = mainWeatherContainer.childNodes[iteration];
  const icon = dayForecast.querySelector('.weather-icon');
  const date = dayForecast.querySelector('.date');
  const feelsLike = dayForecast.querySelector('.feels-like');
  const tempText = dayForecast.querySelector('.temp p');
  const condition = dayForecast.querySelector('.condition');
  icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  date.innerText = `${moment(weather.date).format('MMM Do YY')} \n ${moment(weather.date).format('LT')}`;
  tempText.textContent = (convertTemp) ? convertTemps(weather.temp, tempUom) : weather.temp;
  feelsLike.innerText = `Feels Like\n ${weather.feelsLike} \n ${weather.wind} mph winds\n`;
  condition.textContent = `${weather.condition} - ${weather.conditionDetail}`;
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

export { assignWeatherElement, createWeatherElements, setTempUom };
