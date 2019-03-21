class WeatherView {
    constructor(model) {
        model.subscribe(this.redrawChart.bind(this));
    }

    redrawChart(place, msg) {
        console.log(msg);
        document.getElementById("location").innerHTML = place.location;
        document.getElementById("temp").innerHTML = place.temp;
        document.getElementById("high").innerHTML = place.high;
        document.getElementById("low").innerHTML = place.low;
        document.getElementById("pic").innerHTML = place.icon;
        document.getElementById("humidity").children[1].innerHTML = place.icon;
        document.getElementById("sunrise").children[1].innerHTML = place.icon;
        document.getElementById("sunset").children[1].innerHTML = place.icon;
        document.getElementById("more").children[1].innerHTML = "more info";
    }
}
