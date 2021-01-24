const weatherSpan = document.querySelector(".js-weather");

const API_KEY = `ba3c431455401a91a427f83cecc5f2e0`;
const LOCATION_LS = "LOCATION";


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
function success(pos) {
    var crd = pos.coords;
    const latitude = crd.latitude;
    const longitude = crd.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    /*
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    */
    saveLocation(coordsObj);
    getWeather(latitude, longitude);
    
};
  
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};
  
function requestCoords(){
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function saveLocation(coordsObj){
    localStorage.setItem(LOCATION_LS, JSON.stringify(coordsObj));
}

function loadLocation(){
    const loadedLocation = localStorage.getItem(LOCATION_LS);
    if (loadedLocation !== null) {
        const parsedLocation = JSON.parse(loadedLocation);
        getWeather(parsedLocation.latitude, parsedLocation.longitude);
    } else {
        requestCoords();
    }
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        const temp = data.main.temp;
        const weathers = data.weather[data.weather.length -1];
        weatherSpan.innerHTML = `${temp}&#8451; ${weathers.main}`;
    })
}

function init(){
    loadLocation();
}


init();