"use strict";

var ipUrl = "https://ipapi.co/74.207.62.6/json/";
var apiKey = "be01eab3dff98198cc699228d54aee01";
var apiKey2 = "b8f381522463f5ee0c04df3bfca0ca15";//josh's key in case of too many requests
var favoriteLocations = {"52101":createUrlWithZip("52104"), "55124":createUrlWithZip("55124")};//maps location(key) to url(value) this will be saved to local storage so that we will not have to keep on creating links and can remember favorite locations(use heart button eventually)
//for now just starting favoriteLocation with default places: Decorah/52101 and SaintPaul/55124

function populateFavoriteLocations(){//takes localStorage memory of favoriteLocations dictionary
 //no pass; needed - python needs it but js does not!
 //do this later when implementing localStorage
}

function createUrlWithLocation(location){
    // api.openweathermap.org/data/2.5/weather?q={city name}
    // api.openweathermap.org/data/2.5/weather?q=London
    // api.openweathermap.org/data/2.5/weather?q={city name},{country code}
    // api.openweathermap.org/data/2.5/weather?q=London,uk
    return "api.openweathermap.org/data/2.5/weather?q="+location+"&APPID="+apiKey;
}

function createUrlWithZip(zipCountry){//Takes in zip,country
    // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}
    // api.openweathermap.org/data/2.5/weather?zip=94040,us
    return "api.openweathermap.org/data/2.5/weather?zip="+zipCountry+",us&APPID="+apiKey;//Assumes that country is US for now.
}

function save_favorites(){//save dictionary "favoriteLocations" to Local storage

}

function load_favorites(){//load favorites from localStorage in "favoriteLocations"

}

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getLocation() {
    let loc = await getData(ipUrl);
    return [loc["city"], loc["region"], loc["country"]].join(", ");
}

async function getWeather(weatherUrl) {//returns dataArray of weather data from given url-(link to API of specified location(weatherUrl))
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
    let locFromApi = await getLocation();
    let londonWeatherData = await getWeather("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b8f381522463f5ee0c04df3bfca0ca15");//this url is for London
    let london = new WeatherOfPlace(londonWeatherData[0], londonWeatherData[1], londonWeatherData[2], londonWeatherData[3], londonWeatherData[4], londonWeatherData[5], londonWeatherData[6], londonWeatherData[7], londonWeatherData[8]);
    
    //These lines show functionality of api and parsing it into program:
    //Which is better? - These two lines:
    // let resultElement = document.getElementById("locFrmApi");
    // resultElement.innerHTML = loc;
    // vs this one line:
    // document.getElementById("currWeather").innerHTML = london;

    //This section will focus on creating a "favorite locations" memory:
    //Pretend Current added cities

    for(let loc of favoriteLocations){
        let ldiv = document.querySelector("#shoppingListDiv");
    }


}

window.addEventListener("load", main);
