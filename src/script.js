let now = new Date();

let days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#todaysDate");
currentDate.innerHTML = `${day}, ${hour}:${minutes}`;

function pointCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;

  let apiKey = "58b6c46461e693e538a4d455496c8ce6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", pointCity);

//displayForecast function

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col"> <div class="row d-flex justify-content-center weeklyTemperatures">
          <span class="col-2">${Math.round(forecastDay.temp.max)}°</span>
        </div>

        <div class="row d-flex justify-content-center weeklyTemperaturesIcons">
          <span class="col-2 pictureWeather"><img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width=50px></img></span>
        </div>
        <div class="row d-flex justify-content-center weekDays">
          <span class="col-2">${formatDay(forecastDay.dt)}</span>
        </div></div>`;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//forecast coordinates

function getForecast(coordinates) {
  let apiKey = "58b6c46461e693e538a4d455496c8ce6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  let city = document.querySelector("#citysName");
  city.innerHTML = response.data.name;

  let todaysTemperature = Math.round(response.data.main.temp);

  let h3 = document.querySelector("#todaysTemperature");
  h3.innerHTML = `${todaysTemperature}°C`;

  celsiusTemperature = Math.round(response.data.main.temp);

  let windSpeed = response.data.wind.speed;

  let speedWind = document.querySelector("#windSpeed");
  speedWind.innerHTML = `Wind speed: ${windSpeed}mps`;

  let humidity = response.data.main.humidity;

  let humidityy = document.querySelector("#humidity");
  humidityy.innerHTML = `Humidity: ${humidity}%`;

  let humanPerception = Math.round(response.data.main.feels_like);

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like: ${humanPerception}°`;

  let weatherInDetails = response.data.weather[0].main;

  let inDetails = document.querySelector("#cloudyOrNot");
  inDetails.innerHTML = `${weatherInDetails}`;

  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

//locates you and displays data automatically

function changeLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "58b6c46461e693e538a4d455496c8ce6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

navigator.geolocation.getCurrentPosition(changeLocation);

//end of locate

pointCity("London");
