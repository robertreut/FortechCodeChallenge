import {createIssue} from '../Controller/Controller.js';

window.onload = function () {
    document.getElementById("create").onclick = function () {
        let name = document.getElementById("Name").elements[0].value;
        let type = 'task';
        let sprintId = document.getElementById("Sprint").elements[0].value;
        let assigneeId = document.getElementById("Assignee").elements[0].value;
        let description = document.getElementById("Description").elements[0].value;
        createIssue(type, name, sprintId, assigneeId, description, null);
    }

};