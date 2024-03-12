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

function displayForecast() {
    
    let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let forecastHtml = "";
    days.forEach(function (day) {
    forecastHtml =
    forecastHtml + `
    <div class="forecast-day">
    <div class="forecast-date">
    ${day}
    </div>
    <div class="forecast-emoji"> 🌤 </div>
    <div class="forecast-temperature">
    <span class="forecast-temperature-max">
    18°
    </span> 
    <span class="forecast-temperature-min">
    12°
    </span>
    </div>
    </div>
    `; 
});
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
displayForecast();