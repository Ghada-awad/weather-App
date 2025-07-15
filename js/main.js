let meunList = document.querySelector("ul");
let menuIcon = document.querySelector(".menu-icon");
let searchInput = document.querySelector("#searchInput");
let findLocation = document.querySelector("#findLocation");
let cityName = document.querySelector(".city-name");
menuIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  meunList.style = "display:block";
});
findLocation.addEventListener("click", function () {
  getCountry(searchInput.value);
});
let arrayOfcountries;
async function getCountry(country) {
  try {
    let countries = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=740f69b9b6554f9ab32135657251307&q=${country}&aqi=no`
    );
    let finalCountries = await countries.json();
    arrayOfcountries = finalCountries;
    getWeather(country);

    console.log(arrayOfcountries);
  } catch (error) {
    console.log(error);
  }
}
let arrayofDays = [];
async function getWeather(country) {
  try {
    let weather = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=740f69b9b6554f9ab32135657251307&q=${country}&days=3&aqi=no&alerts=no`
    );
    let finalWeather = await weather.json();
    arrayofDays = finalWeather.forecast.forecastday;
    displayDate();
    console.log(arrayofDays);
  } catch (error) {
    console.log(error);
  }
}
function displayDate() {
  let cartona = ``;
  let DayForecast;
  let WeatherForecast;
  for (var i = 0; i < arrayofDays.length; i++) {
    DayForecast = arrayofDays[i].date;
    WeatherForecast = arrayofDays[i].day;
    const valentines = new Date(DayForecast);
    const dayOfmonth = valentines.getDate();
    const month = valentines.getMonth();
    const day = valentines.getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsName = [
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
    dayOfweeks = dayNames[day];
    let months = monthsName[month];
    cartona += `<div class="col-lg-4 p-0 today-forcast">
                        <div>
                            <div class="header  d-flex justify-content-between align-content-center  p-2">
                                <div class="text-capitalize">${dayOfweeks}</div>
                                <div class="text-capitalize"><span>${dayOfmonth}</span>${months}</div>
                            </div>
                            <div class="main  p-3">
                                <p class="city-name">${arrayOfcountries.location.name}</p>
                                <div class="num-degree">
                                    <h1 class="today-degree">${WeatherForecast.maxtemp_c}<sup>o</sup>C</h1>
                                    <img src="${WeatherForecast.condition.icon}" alt="">
                                </div>
                            </div>
                            <div class="footer">
                                <p class="type-of-weather">${WeatherForecast.condition.text}</p>
                                <div class="d-flex justify-content-around align-content-center pb-3">
                                    <div>
                                        <img src="./images/icon-umberella.png" alt="">
                                        <span>20%</span>
                                    </div>
                                    <div>
                                        <img src="./images/icon-wind.png" alt="">
                                        <span>18Km/h</span>
                                    </div>
                                    <div>
                                        <img src="./images/icon-compass.png" alt="">
                                        <span>East</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
  }
  document.querySelector(".row").innerHTML = cartona;
}
getCountry("egypt");
