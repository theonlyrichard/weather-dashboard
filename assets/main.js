var cities = [];

var pastSearchButtolEl = document.querySelector("#past-search-buttons");
var forecastTitle = document.querySelector("#forecast");
var citySearchInputEl = document.querySelector("#seached-city");
var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var forecastContainerEL = document.querySelector("#fiveday-container")

var getCityWeather = function () {
    var apiKey = "d5760920d32ae79d54b7a28363846200"
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

var displayWeather = function (weather, searchCity) {
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;
}
var formSumbitHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({ city });
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

var temperatureEl = document.createElement("span");
temperatureEl.textContent = "Temperature:" + weather.main.temp + "°F";
temperatureEl.classList = "list-group-item"

weatherContainerEl.appendChild(temperatureEl);

var windSpeedEl = document.createElement("span");
windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
windSpeedEl.classList = "list-group-item"

weatherContainerEl.appendChild(windSpeedEl);

var humidityEl = document.createElement("span");
humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
humidityEl.classList = "list-group-item"

weatherContainerEl.appendChild(humidityEl);

var currentDate = document.createElement("span")
currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
citySearchInputEl.appendChild(currentDate);

var get5Day = function (city) {
    var apiKey = "d5760920d32ae79d54b7a28363846200"
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                display5Day(data);
            });
        });
};

var display5Day = function (weather) {
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];


        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";




        var forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);



        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);


        forecastEl.appendChild(weatherIcon);


        var forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " °F";


        forecastEl.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = dailyForecast.main.humidity + "  %";


        forecastEl.appendChild(forecastHumEl);

        forecastContainerEl.appendChild(forecastEl);
    }

}

var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var pastSearch = function (pastSearch) {

    // console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city", pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


var pastSearchHandler = function (event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);
