import './index.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { loadScript, getOpenWeatherForCity } from './getWeatherForecast';
import { setTempUom } from './createWeatherElement';

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode!');
}

if (process.env.NODE_ENV === 'development') {
  console.log('Development mode!');
}

function init() {
  document.querySelector('.temp-uom').childNodes[0].addEventListener('click', setTempUom);
  document.querySelector('.temp-uom').childNodes[1].addEventListener('click', setTempUom);
}

getOpenWeatherForCity();
// loadScript();

init();
