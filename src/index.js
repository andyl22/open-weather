import './index.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { loadScript, generateWeatherForLocation } from './getWeatherForecast';
import './weather.jpg';

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode!');
}

if (process.env.NODE_ENV === 'development') {
  console.log('Development mode!');
}

function locationQuery(e) {
  e.preventDefault();
  const searchInput = document.getElementById('location-search-input');
  const locationName = document.getElementById('weather-location');
  generateWeatherForLocation(searchInput.value);
  locationName.textContent = `Weather for ${searchInput.value}`;
  searchInput.value = '';
}

const searchForm = document.getElementById('location-search-form');
searchForm.addEventListener('submit', locationQuery);

loadScript();
