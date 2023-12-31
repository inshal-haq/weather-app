const weatherApiKey = '796c26d055694ad58a103608231510';
const numOfForecastDays = 3;

let isFahrenheit = true;
let city = 'London'
const forecastDiv = document.querySelector('#forecast-data');
const dateDiv = document.querySelector('#forecast-date');
const search = document.querySelector('input');
const searchButton = document.querySelector('#search-button');
const cityDiv = document.querySelector('#city');
const toggleButton = document.querySelector('#toggle');

searchButton.addEventListener('click', () => {
  city = search.value || 'london';
  getWeatherForecast(city);
});

toggleButton.addEventListener('click', () => {
  isFahrenheit = !isFahrenheit;
  getWeatherForecast(city);
});

getWeatherForecast(city);

async function getWeatherForecast(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=${numOfForecastDays}`, {mode: 'cors'});
    if (response.status == 200) {
      const data = await response.json();
      cityDiv.textContent = data.location.name;
      displayForecast(data.forecast.forecastday);
    } else {
      throw error;
    }
  }
  catch(error) {
    alert(`Please input a correct location.
Allowed inputs: US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name`);
    console.log(error);
  }
}

function displayForecast(days) {
  let dateHTML = '';
  let weatherHTML = '';
  days.forEach(day => {
    let date = day.date;
    let weather = day.day.condition.text;
    let maxTempC = day.day.maxtemp_c + 'C';
    let maxTempF = day.day.maxtemp_f + 'F';
    let minTempC = day.day.mintemp_c + 'C';
    let minTempF = day.day.mintemp_f + 'F';

    dateHTML += `
      <h2>${date}</h2>
    `;

    weatherHTML += `
      <div class="day-weather">
        <div>${weather}</div>
        <div>High: ${(isFahrenheit) ? maxTempF : maxTempC}</div>
        <div>Low: ${(isFahrenheit) ? minTempF : minTempC}</div>
      </div>
    `;
  });

  forecastDiv.innerHTML = weatherHTML;
  dateDiv.innerHTML = dateHTML;
}