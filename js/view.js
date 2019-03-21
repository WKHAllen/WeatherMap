class ShoppingView {
    constructor(model) {
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(shoppingList, msg) {
        console.log(msg);
        let ldiv = document.querySelector("#shoppingListDiv");
        let tbl = ldiv.querySelector("table");
        if (!tbl) {
            tbl = document.createElement("table");
            tbl.setAttribute("id", "shoppingListTable");//style this in css
            ldiv.appendChild(tbl);
        }

        
        tbl.innerHTML = "";
        for(let item of shoppingList[allItems]){  //for i OF shoppingList |||| not for i IN shoppingList     
            this.addRow(item, tbl);
        }
    }


    addRow(item, parent) {
        let row = document.createElement("tr");

        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.onclick = function() {
            item.acquired=true;
        };
        let cbCell = document.createElement("td");
        cbCell.appendChild(cb);
        row.appendChild(cbCell);

        for (let val of ["name", "quantity", "price", "store", "section"]) {
            let td = document.createElement("td");
            td.innerText = item[val];
            row.appendChild(td);
        }

        parent.appendChild(row);
    }
}
