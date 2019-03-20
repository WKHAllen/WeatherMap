"use strict";

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getLocation() {
    let url = "https://ipinfo.io/json";
    let loc = await getData(url);
    return [loc["city"], loc["region"], loc["country"]].join(", ");
}

async function main() {
    let loc = await getLocation();
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = loc;
}

window.addEventListener("load", main);
