class WeatherView {
    constructor(model) {
        model.subscribe(this.redrawChart.bind(this));
    }

    redrawChart(place, msg) {
        console.log(msg);


        //Examples of getting/setting html elements:
        // let ldiv = document.querySelector("#shoppingListDiv");
        // let tbl = ldiv.querySelector("table");
        // if (!tbl) {
        //     tbl = document.createElement("table");
        //     tbl.setAttribute("id", "shoppingListTable");//style this in css
        //     ldiv.appendChild(tbl);
        // }
    }
}