import {mainAddress} from "../Utils/Globals.js";
import {generateOverview} from "../Controller/Controller.js";

let overview = generateOverview();

function makeUL(overview) {
    // Create the list element:
    var list = document.createElement('ul');

    for (let i = 0; i < overview.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(overview[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // return the constructed list:
    return list;
}

// Add the contents
document.getElementById('overview').appendChild(makeUL(overview));

window.onload = function () {
    document.getElementById("menu").onclick = function () {
        window.location.href = mainAddress + "menu.html";
    }

};