"use strict";

// var locUrl = "https://ipapi.co/74.207.62.6/json/";
var locUrl = "http://www.geoplugin.net/json.gp"
var apiKey = "be01eab3dff98198cc699228d54aee01";
var apiKey2 = "b8f381522463f5ee0c04df3bfca0ca15";//josh's key in case of too many requests
var favoriteLocations = [];
var currLocation = "";

function addFavorite(){
    
    if(favoriteLocations.includes(currLocation)){
        alert("location already favorited");
    }
    else{
        favoriteLocations.push(currLocation);
        saveFavorites();
        populateFavoriteLocations();
    }
}

async function getLocation() {
    let loc = await getData(locUrl);
    return [loc["geoplugin_city"], loc["geoplugin_region"]].join(", ");
}

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function locationFromParams() { //searches for location already in page
    let params = new URLSearchParams(window.location.search);
    let location = params.get("location");
    if (location === null) {
        return null;
    }
    return decodeURI(location);
}

function populateFavoriteLocations(){ // takes localStorage memory of favoriteLocations dictionary
    let listElement = document.getElementById("favoriteList");
    listElement.innerHTML = "";
    for (let item of favoriteLocations) {
        let li = document.createElement("li");
        let a = document.createElement("a");

        a.setAttribute("href", "?location=" + encodeURI(item)); //URL CHANGE HAPPENS HERE
        a.innerHTML = item;
        
        li.appendChild(a);
        listElement.appendChild(li);
    }
}

function saveFavorites(){ // save dictionary "favoriteLocations" to Local storage
    let string = JSON.stringify(favoriteLocations);
    window.localStorage.setItem("favoriteLocations", string);

}

function loadFavorites(){ // load favorites from localStorage in "favoriteLocations"
    let string = window.localStorage.getItem("favoriteLocations");
    if(string!=null){
        favoriteLocations = JSON.parse(string);
        populateFavoriteLocations();
    }
    else{
        console.log("No favorites saved.")
    }  
}

async function getWeather(location) {//returns dataArray of weather data from given url-(link to API of specified location(weatherUrl))
    let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(location) + (",%20United%20States") + "&APPID=" + encodeURI(apiKey2);
    let currW = await getData(weatherUrl);//Uses link defined by location api to retrieve data from API
    let dataArray=[];
    //These variables are the important pieces of weather data we will implement:
    dataArray.push(currW["name"]);//city name
    dataArray.push(currW["weather"][0]["main"]);//description
    dataArray.push(currW["weather"][0]["icon"]);//icon
    dataArray.push(currW["main"]["temp"]);//temp
    dataArray.push(currW["main"]["temp_max"]);//high
    dataArray.push(currW["main"]["temp_min"]);///low
    dataArray.push(currW["main"]["humidity"]);///humidity
    dataArray.push(currW["sys"]["sunrise"]);//sunrise
    dataArray.push(currW["sys"]["sunset"]);//sunset
    dataArray.push(location.toUpperCase()); //city name, state
    return dataArray;
}

 function populateMainData(dataArray){
    currLocation=dataArray[9];
    document.getElementById("location").innerHTML = dataArray[0];
    document.getElementById("pic").src = "http://openweathermap.org/img/w/"+dataArray[2]+".png";
    document.getElementById("temp").innerHTML = dataArray[3] + "&deg;";
    document.getElementById("high").innerHTML = dataArray[4];
    document.getElementById("low").innerHTML = dataArray[5];
    document.getElementById("humidity").innerHTML = dataArray[6];
    document.getElementById("sunrise").innerHTML = dataArray[7];
    document.getElementById("sunset").innerHTML = dataArray[8];
}

function changeLocation(){
    let loc=document.getElementById("locationInput").value;
    loc=loc.toUpperCase();
    let asd = window.location.href
    let base = asd.split("?location=");
    console.log(base);
    let url = base[0] + "?location=" + encodeURI(loc);
    window.location.replace(url);
}

async function main() {
    let locFromApi = locationFromParams() || await getLocation();
    populateMainData(await getWeather(locFromApi));
    loadFavorites();
}

window.addEventListener("load", main);
