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

//weather conditions

function showCurrentWeather(response) {
  let todaysTemperature = Math.round(response.data.main.temp);

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${todaysTemperature}°C`;
}
