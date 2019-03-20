"use strict";

// on search for city/zip code, redirect to same page but with url arguments, and parse them on page load

var ipUrl = "https://ipinfo.io/json";
var apiKey = "be01eab3dff98198cc699228d54aee01";

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getLocation() {
    let loc = await getData(ipUrl);
    return [loc["city"], loc["region"], loc["country"]].join(", ");
}

async function main() {
    let loc = await getLocation();
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = loc;
}

window.addEventListener("load", main);
