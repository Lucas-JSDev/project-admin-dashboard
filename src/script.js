const elements = {
   sky: "#sky",
   city: "#city",
   date: "#date",
   temperature: "#temperature",
   convert: "#convert",
   input: ".search-box-input",
   searchBtn: ".search",
   feelsLike: "#feelsLike",
   humidity: "#humidity",
   chanceOfRain: "#chanceOfRain",
   windSpeed: "#windSpeed",
   icon: "#icon"
}

function displayDefaultCity () {
   const defaultCity = 'boquim';
   updateWeather (defaultCity)
}
window.addEventListener("load", displayDefaultCity)
function updateWeather(city) {
   fetch(`http://api.weatherapi.com/v1/current.json?key=0c20e1795e634f7db3e201027230308&q=${city}`)
   .then((response) => {
      return response.json();
   })
   .then((data) => {
       document.querySelector(elements.sky).textContent = data.current.condition.text;
       document.querySelector(elements.city).textContent = data.location.name;
       document.querySelector(elements.date).textContent = data.location.localtime;
       document.querySelector(elements.temperature).textContent = data.current.temp_c + "°C";
       document.querySelector(elements.feelsLike).textContent = data.current.feelslike_c + "°C";
       document.querySelector(elements.humidity).textContent = data.current.humidity + "%";
       document.querySelector(elements.chanceOfRain).textContent = data.current.precip_mm + " mm";
       document.querySelector(elements.windSpeed).textContent = data.current.wind_kph + " Km/h";
       document.querySelector(elements.icon).src = data.current.condition.icon;
       document.querySelector(elements.input).value = "";
       console.log(data)
   })
}

document.querySelector(elements.searchBtn).addEventListener("click", function() {
   const cityInput = document.querySelector(elements.input).value;
   updateWeather(cityInput);
});

document.querySelector(elements.input).addEventListener ('keydown', (event)=>{
   if (event.key === 'Enter') {
      const cityInput = document.querySelector(elements.input).value;
      updateWeather(cityInput)
   }
})