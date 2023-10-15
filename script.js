const weatherApiKey = '796c26d055694ad58a103608231510';
const numOfForecastDays = 3;

async function getWeatherForecast(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=${numOfForecastDays}`, {mode: 'cors'});
    if (response.status == 200) {
      const data = await response.json();
      displayForecast(data.forecast.forecastdays);
    }
  }
  catch(error) {
    console.log(error);
  }
}

async function displayForecast(days) {
  
}

getWeatherForecast('london');