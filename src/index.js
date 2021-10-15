import './index.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import getOpenWeatherForCity from './getWeatherForecast';

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode!');
}

if (process.env.NODE_ENV === 'development') {
  console.log('Development mode!');
}

getOpenWeatherForCity();
