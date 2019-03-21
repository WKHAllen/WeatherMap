"use strict";

// var locUrl = "https://ipapi.co/74.207.62.6/json/";
var locUrl = "http://www.geoplugin.net/json.gp"
var apiKey = "be01eab3dff98198cc699228d54aee01";
var apiKey2 = "b8f381522463f5ee0c04df3bfca0ca15";//josh's key in case of too many requests
var favoriteLocations = ["Decorah, Iowa, United States", "Saint Paul, Minnesota, United States"];
//for now just starting favoriteLocation with default places: Decorah/52101 and SaintPaul/55124

function locationFromParams() {
    let params = new URLSearchParams(window.location.search);
    let location = params.get("location");
    if (location === null) {
        return null;
    }
    return decodeURI(location);
}

function populateFavoriteLocations(){ // takes localStorage memory of favoriteLocations dictionary
    let listElement = document.getElementById("favorites");
    
    for (let item of favoriteLocations) {
        let li = document.createElement("li");
        let a = document.createElement("a");

        a.setAttribute("href", "?location=" + encodeURI(item));
        a.innerHTML = item;
        
        li.appendChild(a);
        listElement.appendChild(li);
    }
}

function createUrlWithLocation(location){
    // api.openweathermap.org/data/2.5/weather?q={city name}
    // api.openweathermap.org/data/2.5/weather?q=London
    // api.openweathermap.org/data/2.5/weather?q={city name},{country code}
    // api.openweathermap.org/data/2.5/weather?q=London,uk
    return "api.openweathermap.org/data/2.5/weather?q="+location+"&APPID="+apiKey;
}

function saveFavorites(){ // save dictionary "favoriteLocations" to Local storage
    let string = JSON.stringify(favoriteLocations);
    window.localStorage.setItem("favoriteLocations", string);
}

function loadFavorites(){ // load favorites from localStorage in "favoriteLocations"
    let string = window.localStorage.getItem("favoriteLocations");
    favoriteLocation = JSON.parse(string);
}

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getLocation() {
    let loc = await getData(locUrl);
    return [loc["geoplugin_city"], loc["geoplugin_region"], loc["geoplugin_countryName"]].join(", ");
}

async function getWeather(location) {//returns dataArray of weather data from given url-(link to API of specified location(weatherUrl))
    let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + apiKey2
    let currW = await getData(weatherUrl);//Uses link defined by location api to retrieve data from API
    let dataArray=[];
    //These variables are the important pieces of weather data we will probably want to implement:
    dataArray.push(currW["name"]);//location
    dataArray.push(currW["weather"][0]["main"]);//description
    dataArray.push(currW["weather"][0]["icon"]);//icon
    dataArray.push(currW["main"]["temp"]);//temp
    dataArray.push(currW["main"]["temp_max"]);//high
    dataArray.push(currW["main"]["temp_min"]);///low
    dataArray.push(currW["main"]["humidity"]);///humidity
    dataArray.push(currW["sys"]["sunrise"]);//sunrise
    dataArray.push(currW["sys"]["sunset"]);//sunset
    console.log(dataArray);
    return dataArray;
}

async function main() {
    let locFromApi = locationFromParams() || await getLocation();
    console.log(locFromApi);
    populateFavoriteLocations();
    document.getElementById("current-weather").innerHTML = locFromApi;
    let londonWeatherData = await getWeather("London,uk");//this url is for London
    let london = new WeatherOfPlace(...londonWeatherData);
    
    //These lines show functionality of api and parsing it into program:
    //Which is better? - These two lines:
    // let resultElement = document.getElementById("locFrmApi");
    // resultElement.innerHTML = loc;
    // vs this one line:
    // document.getElementById("currWeather").innerHTML = london;

    //This section will focus on creating a "favorite locations" memory:
    //Pretend Current added cities

    for(let loc of favoriteLocations){
        let ldiv = document.getElementById("shoppingListDiv");
    }


}

window.addEventListener("load", main);
