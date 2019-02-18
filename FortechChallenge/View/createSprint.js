import {checkSprintExists} from '../Controller/Controller.js';

window.onload = function () {
    document.getElementById("create").onclick = function () {
        let sprintName = document.getElementById("sprintName").elements[0].value;
        if (!checkSprintExists(sprintName)) {
            document.getElementById('warning').style.display = "block"
        }
    }
};