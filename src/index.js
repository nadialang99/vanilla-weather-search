function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()]; 
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function updateTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#emoji"); // Fix: Added the missing '#' in the selector
    let formattedDate = formatDate(new Date()); // Get the current date and time
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-emoji" />`;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`; // Removed extra backticks
    speedElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = formattedDate;
    getForecast(response.data.city);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function searchCity(city) {
    let apiKey = "134f3c2049b8o8faf56bft351c709b8c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateTemperature);
}

function formatDay(timestamp) {
    let date = new Date(timestamp *1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "134f3c2049b8o8faf56bft351c709b8c";
    let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml =
    forecastHtml + `
    <div class="forecast-day">
    <div class="forecast-date">
    ${formatDay(day.time)}
    </div>
    <div> 
     <img class="forecast-emoji" src="${day.condition.icon_url}" />
    </div>
    <div class="forecast-temperature">
    <span class="forecast-temperature-max">
    ${Math.round(day.temperature.maximum)}°
    </span> 
    <span class="forecast-temperature-min">
    ${Math.round(day.temperature.minimum)}°
    </span>
    </div>
    </div>
    `; 
    }
});
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
