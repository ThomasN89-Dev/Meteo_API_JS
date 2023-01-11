const userInputField = document.querySelector("#user-input");
userInput = "";
const API_KEY = "61b658c4b0d844b4b2984312231001";
const dataWrapper = document.querySelector(".data-wrapper");

function inputData() {
  userInput = userInputField.value;
  userInputField.value = "";
  displayDatas();
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
      console.log(dataParsable);
      createMeteoCard(dataParsable);
    });
}

function createMeteoCard(data) {
  const meteoCard = document.createElement("div");
  meteoCard.className = "meteo-card";

  const meteoLocation = document.createElement("div");
  meteoCard.className = "meteo-location-wrapper";
  meteoCard.appendChild(meteoLocation);

  const locationCity = document.createElement("h3");
  locationCity.className = "location-data";
  locationCity.textContent = data.location.name;
  meteoLocation.appendChild(locationCity);

  const locationDateTime = document.createElement("p");
  locationDateTime.className = "location-dateTime";
  locationDateTime.textContent = `${data.location.localtime}`;
  meteoLocation.appendChild(locationDateTime);

  const locationRegion = document.createElement("p");
  locationRegion.className = "location-data";
  locationRegion.textContent = `${data.location.region} - ${data.location.country}`;
  meteoLocation.appendChild(locationRegion);

  const meteoDatas = document.createElement("div");
  meteoDatas.className = "meteo-data";
  meteoCard.appendChild(meteoDatas);

  const temperature = document.createElement("p");
  temperature.className = "temperature";
  temperature.textContent = `${data.current.temp_c}° C`;
  meteoDatas.appendChild(temperature);

  const conditionWrapper = document.createElement("div");
  conditionWrapper.className = "condition-wrapper";
  meteoDatas.appendChild(conditionWrapper);

  const condition_Text = document.createElement("p");
  condition_Text.className = "condition-text";
  condition_Text.textContent = `${data.current.condition.text}`;
  conditionWrapper.appendChild(condition_Text);

  const condition_img = document.createElement("img");
  condition_img.className = "condition-icon";
  condition_img.src = `${data.current.condition.icon}`;
  conditionWrapper.appendChild(condition_img);

  dataWrapper.appendChild(meteoCard);
}
