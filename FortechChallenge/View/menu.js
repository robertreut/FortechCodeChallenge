import {mainAddress} from "../Utils/Globals.js";

var lists = document.getElementsByClassName("list");

//make menu items links to other pages
var text = lists[0].textContent;
lists[0].textContent = "";
var a = document.createElement("a");
a.href = mainAddress + "createFeatureorBug.html";
a.textContent = text;
lists[0].appendChild(a);

var text = lists[1].textContent;
lists[1].textContent = "";
var a = document.createElement("a");
a.href = mainAddress + "createTask.html";
a.textContent = text;
lists[1].appendChild(a)

var text = lists[2].textContent;
lists[2].textContent = "";
var a = document.createElement("a");
a.href = a.href = mainAddress + "seeOverview.html";
a.textContent = text;
lists[2].appendChild(a);

var text = lists[3].textContent;
lists[3].textContent = "";
var a = document.createElement("a");
a.href = a.href = mainAddress + "updateIssue.html";
a.textContent = text;
lists[3].appendChild(a);

var text = lists[4].textContent;
lists[4].textContent = "";
var a = document.createElement("a");
a.href = a.href = mainAddress + "filterIssues.html";
a.textContent = text;
lists[4].appendChild(a);

var text = lists[5].textContent;
lists[5].textContent = "";
var a = document.createElement("a");
a.href = a.href = mainAddress + "createSprint.html";
a.textContent = text;
lists[5].appendChild(a);

var text = lists[6].textContent;
lists[6].textContent = "";
var a = document.createElement("a");
a.href = a.href = mainAddress + "index.html";
a.textContent = text;
lists[6].appendChild(a);

window.onload = function () {
    document.getElementById("delete").onclick = function () {
        localStorage.clear();
        window.location.href = mainAddress + "index.html";
    }

};