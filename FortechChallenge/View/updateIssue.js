import {checkUpdate} from '../Controller/Controller.js';

window.onload = function () {
    document.getElementById("create").onclick = function () {
        let id = document.getElementById("Id").elements[0].value;
        let name = document.getElementById("Name").elements[0].value;
        let status = "1";
        if (document.getElementById('InProgress').checked) {
            status = document.getElementById('InProgress').value;
        }
        if (document.getElementById('Feedback').checked) {
            status = document.getElementById('Feedback').value;
        }
        if (document.getElementById('Rework').checked) {
            status = document.getElementById('Rework').value;
        }
        if (document.getElementById('Resolved').checked) {
            status = document.getElementById('Resolved').value;
        }
        let sprintId = document.getElementById("Sprint").elements[0].value;
        let assigneeId = document.getElementById("Assignee").elements[0].value;
        let description = document.getElementById("Description").elements[0].value;
        let tasksId = document.getElementById("Tasks").elements[0].value;
        let comment = document.getElementById("Comment").elements[0].value;
        //      console.log(id, name, status, sprintId,assigneeId,description,tasksId,comment);
        checkUpdate(id, status, name, sprintId, assigneeId, description, tasksId, comment);
    }

};