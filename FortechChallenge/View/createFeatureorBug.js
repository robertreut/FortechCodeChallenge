import {createIssue} from '../Controller/Controller.js';

window.onload = function () {
    document.getElementById("create").onclick = function () {
        let name = document.getElementById("Name").elements[0].value;
        let type = 'bug';
        if (document.getElementById('feature').checked) {
            type = document.getElementById('feature').value;
        }
        let sprintId = document.getElementById("Sprint").elements[0].value;
        let assigneeId = document.getElementById("Assignee").elements[0].value;
        let description = document.getElementById("Description").elements[0].value;
        let tasksId = document.getElementById("Tasks").elements[0].value;
        createIssue(type, name, sprintId, assigneeId, description, tasksId);
    }

};