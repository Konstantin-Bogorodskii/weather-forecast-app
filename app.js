const API_KEY = 'ed5a6107bf7551e676fffa9532618263';
const API_BASE = 'api.openweathermap.org/data/2.5/';

const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');
const error = document.querySelector('.error');
const forecastItem = document.querySelector('.forecast-item');

formButton.addEventListener('click', e => {
  e.preventDefault();
  forecastItem.innerHTML = '';
  if (e.type === 'click') {
    getData(formInput.value);
  }
});

function getData() {
  fetch(`http://${API_BASE}weather?q=${formInput.value}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(response => displayData(response));
}

function displayData(data) {
  const currentDate = new Date().toString().split(' ').splice(1, 3).join(' ');

  console.log(data);
  if (data.cod === '404') {
    error.textContent = 'Please Enter a Valid City';
    formInput.value = '';
  }

  if (data.cod !== '404') {
    error.textContent = '';
    forecastItem.innerHTML = `
      <div class="container">
        <div class="weather-icon">
          <img src="http://openweathermap.org/img/w/${
            data.weather[0].icon
          }.png" alt="Weather Icon" class="weather-icon__img" />
        </div>
        <div class="location">
          <div class="location__city">${data.name}, ${data.sys.country}</div>
          <div class="location__date">${currentDate}</div>
        </div>
        <div class="current">
          <div class="current__temp">Temperature: ${Math.round(data.main.temp)} °C</div>
          <div class="current__weather">Weather: ${data.weather[0].main}</div>
          <div class="current__range">Temp Range: ${Math.round(
            data.main.temp_min
          )} °C / ${Math.round(data.main.temp_max)} °C</div>
        </div>
      </div>
    `;
  }
}
