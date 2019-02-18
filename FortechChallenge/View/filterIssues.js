import {filterIssues} from "../Controller/Controller.js";

window.onload = function () {
    document.getElementById("filter").onclick = function () {
        let sprint = document.getElementById("Sprint").elements[0].value;
        let status = document.getElementById("Status").elements[0].value;
        filterIssues(sprint, status);
    }

};