"use strict"

let fullDate = new Date();
let find = document.getElementById("find");
let findResult;
let weatherDetails;
let current = document.getElementById("current");
let tomorrow = document.getElementById("tomorrow");
let afterTomorrow = document.getElementById("afterTomorrow");
let currentDay = fullDate.toDateString();
let today = fullDate.getDay();
let today1 = fullDate.getDay();
let dayCondition;

let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

$("#loading").ready(function () {
    $(".loader").fadeOut(500, function () {
        $("#loading").fadeOut(500, function () {
            $("body").css("overflow-y", "auto");
            $("#loading").remove();
        });
    });
});

find.addEventListener("keyup", function () {
    findResult = find.value;
    getWeather(findResult);
})

async function getWeather(findResult = "cairo") {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=665742c7ab424c7d81f130432211309&q=${findResult}&days=3`);
    weatherDetails = await response.json();
    if (response.status == 200) {
        displayWeather();
    }
}
getWeather();

function displayWeather() {
    if (today == 6) {
        today = -1;
    }
    if (today1 == 5) {
        today1 = -2
    }
    else if (today1 == 6) {
        today1 = -1
    }

    if (weatherDetails.current.is_day == 1) {
        dayCondition = "day";
    }
    else {
        dayCondition = "night";
    }

    current.innerHTML = `
<div class="item1 h-100">
                        <div class="header1 d-flex justify-content-between py-1 px-2">
                            <p class="my-0 py-2 fw-bolder">${day[fullDate.getDay()]}</p>
                            <p class="my-0 py-2 fw-bolder">${currentDay.substring(currentDay.indexOf(" ") + 1)}</p>
                        </div>
                        <div class="content1 p-4">
                            <div>
                                <p class="fw-bolder fs-4">
                                ${weatherDetails.location.name}
                                </p>
                            </div>
                            <div class="d-flex align-items-center">
                                <p class="fs-1 text-white fw-bolder me-5">${weatherDetails.current.temp_c}<sup>o</sup>C</p>
                                <img src="https:${weatherDetails.current.condition.icon}" alt="${dayCondition}">
                            </div>
                            <div>
                                <p class="fw-bolder text">
                                    ${weatherDetails.current.condition.text}
                                </p>
                            </div>
                            <div class="py-1">
                                <span class="fw-bolder">
                                    <img class="me-2" src="img/icon-umberella.png" alt="umberella">${weatherDetails.forecast.forecastday[0].day.daily_chance_of_rain}%
                                </span>
                                <span class="fw-bolder">
                                    <img class="mx-2" src="img/icon-wind.png" alt="wind">${weatherDetails.current.wind_kph} km/h
                                </span>
                                <span class="fw-bolder">
                                    <img class="mx-2" src="img/icon-compass.png" alt="compass">${weatherDetails.current.wind_dir}
                                </span>
                            </div>
                        </div>

                    </div>`

    tomorrow.innerHTML = `
                    <div class="text-center item2 h-100">
                        <div class="header2 py-1 px-2">
                            <p class="my-0 py-2 fw-bolder">${day[today + 1]}</p>

                        </div>

                        <div class="content2 p-4">

                            <img src="https:${weatherDetails.forecast.forecastday[1].day.condition.icon}" alt="${weatherDetails.forecast.forecastday[1].day.condition.text}">
                            <p class="text-white fs-4 fw-bolder">${weatherDetails.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                            <p class="fw-bolder fs-6">${weatherDetails.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                            <p class="fw-bolder text">${weatherDetails.forecast.forecastday[1].day.condition.text}</p>
                        </div>

                    </div>`

    afterTomorrow.innerHTML = `
                    <div class="text-center item3 h-100">
                    <div class="header3 py-1 px-2">
                        <p class="my-0 py-2 fw-bolder">${day[today1 + 2]}</p>

                    </div>

                    <div class="content3 p-4">

                        <img src="https:${weatherDetails.forecast.forecastday[2].day.condition.icon}" alt="${weatherDetails.forecast.forecastday[2].day.condition.text}">
                        <p class="text-white fw-bolder fs-4">${weatherDetails.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                        <p class="fw-bolder fs-6">${weatherDetails.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                        <p class="fw-bolder text">${weatherDetails.forecast.forecastday[2].day.condition.text}</p>
                    </div>

                </div>`
}

