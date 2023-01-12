const userInputField = document.querySelector("#user-input");
userInput = "";
const API_KEY = "61b658c4b0d844b4b2984312231001";
const dataWrapper = document.querySelector(".data-wrapper");
let map;

function inputData() {
  userInput = userInputField.value;
  userInputField.value = "";
  displayDatas();
  displayForecast();
}

function displayDatas() {
  dataWrapper.innerHTML = "";
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${userInput}&aqi=no`
  )
    .then((x) => x.text())
    .then((y) => (data = y))
    .then(() => {
      let dataParsable = JSON.parse(data);
      createMeteoCard(dataParsable);
    });
}

function createMeteoCard(data) {
  const position = { lat: data.location.lat, lng: data.location.lon };
  const meteoCard = document.createElement("div");
  meteoCard.className = "meteo-card";
  meteoCard.innerHTML = `
    <div class="meteo-location-wrapper">
      <h3 class="location-data">${data.location.name}</h3>
      <p class="location-dateTime">${data.location.localtime}</p>
      <div class="location-data">
        <p>${data.location.region}</p>
        <p>${data.location.country}</p>
      </div>
    </div>
    <div class="meteo-data">
      <p class="temperature">${data.current.temp_c}° C</p>
      <div class="condition-wrapper">
        <p class="condition-text">${data.current.condition.text}</p>
        <img class="condition-icon" src="${data.current.condition.icon}">
      </div>
    </div>
  `;

  // map = new google.maps.Map(document.getElementById("map"), {
  //   center: { lat: data.location.lat, lng: data.location.lon },
  //   zoom: 13,
  // });
  // const marker = new google.maps.Marker({
  //   position: position,
  //   map: map,
  // });

  dataWrapper.appendChild(meteoCard);
}

function displayForecast() {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${userInput}&days=3&aqi=no`
  )
    .then((x) => x.text())
    .then((y) => (data = y))
    .then(() => {
      let forecastData = JSON.parse(data);
      let forecastDays = forecastData.forecast.forecastday;
      forecastDays.forEach((day) => {
        createForecastCard(day);
      });
    });
}

function createForecastCard(data, x) {
  const forecastCard = document.createElement("div");
  forecastCard.className = "forecast-card";
  forecastCard.innerHTML = `
    <div class="meteo-location-wrapper">
      <h3 class="location-data">${data.date}</h3>
    </div>
  `;

  dataWrapper.appendChild(forecastCard);
}

function createForecastCard(data) {
  const forecastCard = document.createElement("div");
  forecastCard.className = "forecast-card";
  forecastCard.innerHTML = `
    <div class="forecast-wrapper">
      <h3 class="forecast-data">${data.date}</h3>
    </div>
  `;

  const hoursWrapper = document.createElement("div");
  hoursWrapper.className = "forecast-hours-wrapper";
  forecastCard.appendChild(hoursWrapper);

  data.hour.forEach((hour) => {
    const dayHour = document.createElement("div");
    dayHour.className = "forecast-hour";
    dayHour.innerHTML = `
      <p class='hour'>${hour.time}</p>
      <div class='condition-wrapper'>
        <span class='condition'>${hour.condition.text}</span>
        <img src='${hour.condition.icon}' />
      </div>
      <p class='temperature'>${hour.temp_c}° C</p>
    `;

    hoursWrapper.appendChild(dayHour);
  });

  dataWrapper.appendChild(forecastCard);
}
