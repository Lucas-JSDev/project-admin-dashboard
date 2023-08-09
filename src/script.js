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
   forecastMenu: {
      day1: "#day1",
      day2: "#day2",
      day3: "#day3",
      day4: "#day4",
      day5: "#day5",
      day6: "#day6",
      day7: "#day7",
      max1: "#max1",
      max2: "#max2",
      max3: "#max3",
      max4: "#max4",
      max5: "#max5",
      max6: "#max6",
      max7: "#max7",
      min1: "#min1",
      min2: "#min2",
      min3: "#min3",
      min4: "#min4",
      min5: "#min5",
      min6: "#min6",
      min7: "#min7",
      icon1: "#icon1",
      icon2: "#icon2",
      icon3: "#icon3",
      icon4: "#icon4",
      icon5: "#icon5",
      icon6: "#icon6",
      icon7: "#icon7",
   }
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
   weatherData.then(updateWeather);
});

function transformDateOnDay (date){
   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
   const day = new Date(date).getDay();
   return daysOfWeek[day];
}

getWeather('boquim').then((data)=> console.log(data))

function updateWeather (data) {
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
   //a partir daqui é ladeira abaixo
   document.querySelector(elements.forecastMenu.day1).textContent = transformDateOnDay(data.forecast.forecastday[0].date);
   document.querySelector(elements.forecastMenu.day2).textContent = transformDateOnDay(data.forecast.forecastday[1].date);
   document.querySelector(elements.forecastMenu.day3).textContent = transformDateOnDay(data.forecast.forecastday[2].date);
   document.querySelector(elements.forecastMenu.day4).textContent = transformDateOnDay(data.forecast.forecastday[3].date);
   document.querySelector(elements.forecastMenu.day5).textContent = transformDateOnDay(data.forecast.forecastday[4].date);
   document.querySelector(elements.forecastMenu.day6).textContent = transformDateOnDay(data.forecast.forecastday[5].date);
   document.querySelector(elements.forecastMenu.day7).textContent = transformDateOnDay(data.forecast.forecastday[6].date);
   //e piora
   document.querySelector(elements.forecastMenu.max1).textContent = data.forecast.forecastday[0].day.maxtemp_c + "°C";
   document.querySelector(elements.forecastMenu.max2).textContent = data.forecast.forecastday[1].day.maxtemp_c + "°C";
   document.querySelector(elements.forecastMenu.max3).textContent = data.forecast.forecastday[2].day.maxtemp_c + "°C";
   document.querySelector(elements.forecastMenu.max4).textContent = data.forecast.forecastday[3].day.maxtemp_c + "°C";
   document.querySelector(elements.forecastMenu.max5).textContent = data.forecast.forecastday[4].day.maxtemp_c + "°C";
   document.querySelector(elements.forecastMenu.max6).textContent = data.forecast.forecastday[5].day.maxtemp_c + "°C";
   document.querySelector(elements.forecastMenu.max7).textContent = data.forecast.forecastday[6].day.maxtemp_c + "°C";
   //achou que eu tava brincando??
   document.querySelector(elements.forecastMenu.min1).textContent = data.forecast.forecastday[0].day.mintemp_c + "°C";
   document.querySelector(elements.forecastMenu.min2).textContent = data.forecast.forecastday[1].day.mintemp_c + "°C";
   document.querySelector(elements.forecastMenu.min3).textContent = data.forecast.forecastday[2].day.mintemp_c + "°C";
   document.querySelector(elements.forecastMenu.min4).textContent = data.forecast.forecastday[3].day.mintemp_c + "°C";
   document.querySelector(elements.forecastMenu.min5).textContent = data.forecast.forecastday[4].day.mintemp_c + "°C";
   document.querySelector(elements.forecastMenu.min6).textContent = data.forecast.forecastday[5].day.mintemp_c + "°C";
   document.querySelector(elements.forecastMenu.min7).textContent = data.forecast.forecastday[6].day.mintemp_c + "°C";
   // kkkkkkkkkkkk
   document.querySelector(elements.forecastMenu.icon1).src = data.forecast.forecastday[0].day.condition.icon;
   document.querySelector(elements.forecastMenu.icon2).src = data.forecast.forecastday[1].day.condition.icon;
   document.querySelector(elements.forecastMenu.icon3).src = data.forecast.forecastday[2].day.condition.icon;
   document.querySelector(elements.forecastMenu.icon4).src = data.forecast.forecastday[3].day.condition.icon;
   document.querySelector(elements.forecastMenu.icon5).src = data.forecast.forecastday[4].day.condition.icon;
   document.querySelector(elements.forecastMenu.icon6).src = data.forecast.forecastday[5].day.condition.icon;
   document.querySelector(elements.forecastMenu.icon7).src = data.forecast.forecastday[6].day.condition.icon;
}
