"use strict";

var ipUrl = "https://ipapi.co/74.207.62.6/json/";
var apiKey = "be01eab3dff98198cc699228d54aee01";
var apiKey2 = "b8f381522463f5ee0c04df3bfca0ca15";


async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getLocation() {
    let loc = await getData(ipUrl);
    return [loc["city"], loc["region"], loc["country"]].join(", ");
}

async function getWeather(weatherUrl) {//returns dataArray of weather data from given link to API of specified location
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
    let loc = await getLocation();
    let resultElement = document.getElementById("location");
    resultElement.innerHTML = loc;

    let lwd = await getWeather("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b8f381522463f5ee0c04df3bfca0ca15");
    let london = new WeatherOfPlace(lwd[0], lwd[1], lwd[2], lwd[3], lwd[4], lwd[5], lwd[6], lwd[7], lwd[8]);
    document.getElementById("currWeather").innerHTML = london;
}

window.addEventListener("load", main);
