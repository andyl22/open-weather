import moment from 'moment';

let tempUom = 'farenheit';

function convertTemps(temp) {
  if (tempUom === 'celsius') {
    return Math.round((temp - 32) * (5 / 9));
  }
  return Math.round(((temp * 1.8) + 32));
}

function reassignTemps() {
  const allTemperatureContent = document.querySelectorAll('.temp p');
  allTemperatureContent.forEach((temp) => {
    temp.textContent = convertTemps(temp.textContent);
  });
}

function removeActiveClass(e) {
  e.path[1].querySelectorAll('button').forEach((node) => {
    if (node.id !== e.target.id) {
      node.classList.remove('active');
    }
  });
}

function setTempUom(e) {
  if (tempUom === e.target.id) {
    return;
  }
  removeActiveClass(e);
  tempUom = e.target.id;
  e.target.classList.add('active');
  reassignTemps(tempUom);
}

function enableTempUomOption() {
  document.querySelector('.temp-uom').querySelector('#farenheit').addEventListener('click', setTempUom);
  document.querySelector('.temp-uom').querySelector('#celsius').addEventListener('click', setTempUom);
}

function assignWeatherData(weather, weatherElement) {
  const temperature = (tempUom === 'celsius') ? convertTemps(weather.temp, tempUom) : Math.round(weather.temp);
  const icon = weatherElement.querySelector('.weather-icon');
  const date = weatherElement.querySelector('.date');
  const feelsLike = weatherElement.querySelector('.feels-like');
  const tempText = weatherElement.querySelector('.temp p');
  const condition = weatherElement.querySelector('.condition');
  icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  date.innerText = `${moment(weather.date).format('MMM Do YY')} \n ${moment(weather.date).format('LT')}`;
  tempText.textContent = temperature;
  feelsLike.innerText = `Feels Like: ${temperature} \n ${weather.wind} mph winds\n`;
  condition.textContent = `${weather.condition} - ${weather.conditionDetail}`;
}

function existingElementChecker(element) {
  if (element.length > 0) {
    return true;
  }
  return false;
}

function createWeatherElements(parentContainer) {
  const dayForecast = document.createElement('div');
  const weatherDetails = document.createElement('div');
  const temp = document.createElement('div');
  const feelsLike = document.createElement('p');
  const condition = document.createElement('p');
  const date = document.createElement('p');
  const icon = document.createElement('img');
  const tempSummary = document.createElement('div');
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
  tempSummary.append(date);
  tempSummary.append(temp);
  tempSummary.className = 'temp-summary';
  weatherDetails.appendChild(tempSummary);
  weatherDetails.appendChild(feelsLike);
  weatherDetails.appendChild(condition);
  dayForecast.appendChild(weatherDetails);
  parentContainer.appendChild(dayForecast);
}

export {
  assignWeatherData,
  existingElementChecker,
  createWeatherElements,
  enableTempUomOption,
};
