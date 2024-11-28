function refreshWeather(response) {
  //API to change the temperature to live data
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#current-city");
  let temperature = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(temperature);

  //API to change the name of the city and country
  let cityName = response.data.city;
  let country = response.data.country;
  currentCity.innerHTML = `${cityName}, ${country}`;

  //lesson8: adding the weather data
  //API to update the weather condition
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  //Update the feelLIke, humidity, wind and pressure data
  let feelElement = document.querySelector("#feel");
  let feel = response.data.temperature.feels_like;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");
  feelElement.innerHTML = `${Math.round(feel)} °C`;
  humidityElement.innerHTML = `${response.data.temperature.humidity} % `;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  pressureElement.innerHTML = `${response.data.temperature.pressure} mb`;

  //lesson 8 update the time and date and icon image
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" >`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = weekDays[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let year = date.getFullYear();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }

  return `${hours}:${minutes}, ${day} ${currentDate} ${currentMonth} ${year}`;
}

function searchCity(city) {
  //make api call and update interface
  let apiKey = "3c7309d28c043t607b2dfaaod68ce09a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

//lesson 6: search engine
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

//forecast week 8

function getForecast(city) {
  let apiKey2 = "3c7309d28c043t607b2dfaaod68ce09a";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey2}&units=metric`;
  axios.get(apiUrl2).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  //create an array with all the days of the week needed
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];

  let forecastHtml = " ";

  //loop
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-day">
  <div class="forcast-date">${day}</div>
  <div class="forecast-icon">⛅</div>
  <div class="forecast-temps">
  <div class="temps"><strong> 15° </strong></div>
  <div class="temps">6°</div>
  </div>
  </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Johannesburg");
