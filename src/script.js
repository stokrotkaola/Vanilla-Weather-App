//date and time
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

//pointing city

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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  let days = ["SUN", "MON", "TUE", "WED", "THU"];

  days.forEach(function (day) {
    forecastHTML = ` <div class="row d-flex justify-content-center weeklyTemperatures">
          <span class="col-2">13°C</span>
          <span class="col-2">14°C</span>
          <span class="col-2">13°C</span>
          <span class="col-2">15°C</span>
          <span class="col-2">12°C</span>
        </div>
        <div class="row d-flex justify-content-center weeklyTemperaturesIcons">
          <span class="col-2">☀</span>
          <span class="col-2">☀</span>
          <span class="col-2">☀</span>
          <span class="col-2">☀</span>
          <span class="col-2">☀</span>
        </div>
        <div class="row d-flex justify-content-center weekDays">
          <span class="col-2">SUN</span>
          <span class="col-2">MON</span>
          <span class="col-2">TUE</span>
          <span class="col-2">WED</span>
          <span class="col-2">THU</span>
        </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

//forecast coordinates

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "58b6c46461e693e538a4d455496c8ce6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//WEATHER CONDITIONS

//temperature

function showCurrentWeather(response) {
  let todaysTemperature = Math.round(response.data.main.temp);

  let h3 = document.querySelector("#todaysTemperature");
  h3.innerHTML = `${todaysTemperature}`;

  celsiusTemperature = Math.round(response.data.main.temp);

  //wind speed

  let windSpeed = response.data.wind.speed;

  let speedWind = document.querySelector("#windSpeed");
  speedWind.innerHTML = `${windSpeed}mps`;

  //humidity

  let humidity = response.data.main.humidity;

  let humidityy = document.querySelector("#humidity");
  humidityy.innerHTML = `${humidity}%`;

  //feels like

  let humanPerception = Math.round(response.data.main.feels_like);

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `${humanPerception}°C`;

  //weather derscription - cloudy, sunny etc.

  let weatherInDetails = response.data.weather[0].main;

  let inDetails = document.querySelector("#cloudyOrNot");
  inDetails.innerHTML = `${weatherInDetails}`;

  //weather icon
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

// Converting to Fahrenheit and Celsius

function displayFahrenTemperature(event) {
  event.preventDefault();
  celsTemperature.classList.remove("active");
  fahrenTemperature.classList.add("active");
  let temperatureElement = document.querySelector("#todaysTemperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function displayCelsTemperature(event) {
  event.preventDefault();
  celsTemperature.classList.add("active");
  fahrenTemperature.classList.remove("active");
  let temperatureElement = document.querySelector("#todaysTemperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenTemperature = document.querySelector("#fahren-unit");
fahrenTemperature.addEventListener("click", displayFahrenTemperature);

let celsTemperature = document.querySelector("#cels-unit");
celsTemperature.addEventListener("click", displayCelsTemperature);

displayForecast();
