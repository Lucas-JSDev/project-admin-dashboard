const elements = {
   rigthMenu: {
      sky: "#sky",
      city: "#city",
      region: "#region",
      temperature: "#temperature",
      convert: "#convert",
      input: ".search-box-input",
      searchBtn: ".search",
      icon: "#icon",
      formSearch: "#formSearch"
   },
   leftMenu: {
      feelsLike: "#feelsLike",
      humidity: "#humidity",
      chanceOfRain: "#chanceOfRain",
      windSpeed: "#windSpeed",
   },
   breakdownContainer: ".dataShow",
   hourlyBtn: "#hourlyBtn",
   dailyBtn: "#dailyBtn"
}

function displayDefaultCity () {
   const defaultCity = 'boquim';
   const weatherData = getWeather (defaultCity);
   weatherData.then(updateWeather)
}

window.addEventListener("load", displayDefaultCity);

function getWeather(city) {
   return fetch(`http://api.weatherapi.com/v1/forecast.json?key=0c20e1795e634f7db3e201027230308&q=${city}&days=7`)
   .then((response) => {
      return response.json();
   });
}

document.querySelector(elements.rigthMenu.formSearch).addEventListener("submit", function(e) {
   e.preventDefault();
   const cityInput = document.querySelector(elements.rigthMenu.input).value;
   const weatherData = getWeather (cityInput);
   weatherData.then(updateDayWeather);
});

document.querySelector(elements.hourlyBtn).addEventListener("click", function() {
   const cityInput = document.querySelector(elements.rigthMenu.input).value;
   const weatherData = getWeather(cityInput);
   weatherData.then(updateHourlyWeather);
});

document.querySelector(elements.dailyBtn).addEventListener("click", function() {
   const cityInput = document.querySelector(elements.rigthMenu.input).value;
   const weatherData = getWeather(cityInput);
   weatherData.then(updateDayWeather);
});

function displayDefaultCity() {
   const defaultCity = 'boquim';
   const weatherData = getWeather(defaultCity);
   weatherData.then(updateDayWeather);
}

function displayHourlyForecast(city) {
   const weatherData = getWeather(city);
   weatherData.then(updateHourlyWeather);
}

function transformDateOnDay (date){
   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
   const day = new Date(date).getDay();
   return daysOfWeek[day];
}

getWeather('boquim').then((data)=> console.log(data))

function updateDayWeather (data) {
   document.querySelector(elements.rigthMenu.sky).textContent = data.current.condition.text;
   document.querySelector(elements.rigthMenu.city).textContent = data.location.name;
   document.querySelector(elements.rigthMenu.region).textContent = data.location.region;
   document.querySelector(elements.rigthMenu.temperature).textContent = data.current.temp_c + "°C";
   document.querySelector(elements.leftMenu.feelsLike).textContent = data.current.feelslike_c + "°C";
   document.querySelector(elements.leftMenu.humidity).textContent = data.current.humidity + "%";
   document.querySelector(elements.leftMenu.chanceOfRain).textContent = data.current.precip_mm + " mm";
   document.querySelector(elements.leftMenu.windSpeed).textContent = data.current.wind_kph + " Km/h";
   document.querySelector(elements.rigthMenu.icon).src = data.current.condition.icon;
   document.querySelector(elements.rigthMenu.input).value = "";
   const breakdownContainer = document.querySelector(elements.breakdownContainer);
   while (breakdownContainer.firstChild) {
      breakdownContainer.removeChild(breakdownContainer.firstChild);
   }

   data.forecast.forecastday.forEach((dayForecast) => {
      const element = getDayForecastElement(dayForecast);
      document.querySelector(elements.breakdownContainer).appendChild(element);
   });
}

function updateHourlyWeather(data) {
   document.querySelector(elements.rigthMenu.sky).textContent = data.current.condition.text;
   document.querySelector(elements.rigthMenu.city).textContent = data.location.name;
   document.querySelector(elements.rigthMenu.region).textContent = data.location.region;
   document.querySelector(elements.rigthMenu.temperature).textContent = data.current.temp_c + "°C";
   document.querySelector(elements.leftMenu.feelsLike).textContent = data.current.feelslike_c + "°C";
   document.querySelector(elements.leftMenu.humidity).textContent = data.current.humidity + "%";
   document.querySelector(elements.leftMenu.chanceOfRain).textContent = data.current.precip_mm + " mm";
   document.querySelector(elements.leftMenu.windSpeed).textContent = data.current.wind_kph + " Km/h";
   document.querySelector(elements.rigthMenu.icon).src = data.current.condition.icon;
   document.querySelector(elements.rigthMenu.input).value = "";
   
   const breakdownContainer = document.querySelector(elements.breakdownContainer);
   while (breakdownContainer.firstChild) {
      breakdownContainer.removeChild(breakdownContainer.firstChild);
   }
   
   data.forecast.forecastday[0].hour.forEach((hourForecast) => {
      const element = getHourForecastElement(hourForecast);
      document.querySelector(elements.breakdownContainer).appendChild(element);
   });
}

function htmlToElem(html) {
   let temp = document.createElement('template');
   html = html.trim();
   temp.innerHTML = html;
   return temp.content.firstChild;
}

function getDayForecastElement (dayForecast) {
   const elementHTML = `
   <div class="dataContainer">
   <div class="days">${transformDateOnDay(dayForecast.date)}</div>
   <div class="tempMax">${dayForecast.day.maxtemp_c}°C</div>
   <div class="tempMin">${dayForecast.day.mintemp_c}°C</div>
   <img class="iconBottom" src="${dayForecast.day.condition.icon}">
   </div>
   `;
   return htmlToElem(elementHTML);
}

function getHourForecastElement(hourForecast) {
   const elementHTML = `
   <div class="dataContainer">
      <div class="hours">${hourForecast.time.slice(11, 16)}</div>
      <div class="temp">${hourForecast.temp_c}°C</div>
      <img class="iconBottom" src="${hourForecast.condition.icon}">
   </div>
   `;
   return htmlToElem(elementHTML);
}
