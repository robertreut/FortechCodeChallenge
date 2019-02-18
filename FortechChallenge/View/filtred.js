import {mainAddress} from "../Utils/Globals.js";

var filtred = localStorage.getItem("filtred");
filtred = JSON.parse(filtred);

function makeUL(filtred) {
    // Create the list element:
    var list = document.createElement('ul');

    for (let i = 0; i < filtred.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(filtred[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // return the constructed list:
    return list;
}

// Add the contents
document.getElementById('filtred').appendChild(makeUL(filtred));

window.onload = function () {
    document.getElementById("menu").onclick = function () {
        window.location.href = mainAddress + "menu.html";
    }

};