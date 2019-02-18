import {User} from '../Models/User.js';
import {Sprint} from "../Models/Sprint.js";
import {Project} from "../Models/Project.js";
import {Status} from "../Models/Status.js";
import Issue from "../Models/Issue.js";
import {Comments} from "../Models/Comments.js";

var userList = [];
var statusesList = [];
var sprintList = [];
var currentUser = 0;

// all the storage needed is located in the localStorage global variable;


export function usersExist() {
    let userList = localStorage.getItem("userList ");
    if (userList) {
        userList = JSON.parse(userList);
        if (userList.length !== 0) {
            return true;
        }
    }
    return false;
}

export function statusesExist() {
    statusesList = localStorage.getItem("statusesList ");
    if (statusesList) {
        statusesList = JSON.parse(statusesList);
        if (statusesList.length !== 0) {
            return true;
        }
    }
    return false;
}

//initializes users to local storage
export function addUsers(names) {
    if (userList == null) {
        userList = [];
    }
    for (let i = 0; i < names.length; i++) {
        let newUser = new User(i + 1, names[i]);
        userList.push(newUser);
    }
    localStorage.setItem("userList", JSON.stringify(userList));
}

//initializes statuses
export function addStatuses(statuses) {
    if (statusesList == null) {
        statusesList = [];
    }
    for (let i = 0; i < statuses.length; i++) {
        let newStatus = new Status(i + 1, statuses[i]);
        statusesList.push(newStatus);
    }
    localStorage.setItem("statusesList", JSON.stringify(statusesList));
}

//checks the logged in user and updates current user of the app
export function checkUser(id) {
    userList = localStorage.getItem("userList");
    if (userList) {
        userList = JSON.parse(userList);
        for (let i = 0; i < userList.length; i++) {
            if (id == userList[i]._id) {
                currentUser = id;
                localStorage.setItem("curentUser", JSON.stringify(currentUser));
                return true;
            }
        }
    }
    return false;
}

export function checkSprint(sprintName) {
    sprintList = localStorage.getItem("sprintList");
    if (sprintList) {
        sprintList = JSON.parse(sprintList);
        for (let i = 0; i < sprintList.length; i++) {
            if (sprintName == sprintList[i]._name) {
                return false;
            }
        }
        return true;
    }
    return true;
}

export function createSprint(sprintName) {
    sprintList = localStorage.getItem("sprintList");
    if (sprintList) {
        let newSprint = new Sprint(sprintList.length + 1, sprintName);
        sprintList = JSON.parse(sprintList);
        sprintList.push(newSprint);
        localStorage.setItem("sprintList", JSON.stringify(sprintList));
        updateProject(newSprint.id);
    } else {
        sprintList = [];
        let newSprint = new Sprint(1, sprintName);
        sprintList.push(newSprint);
        localStorage.setItem("sprintList", JSON.stringify(sprintList));
        updateProject(newSprint.id);
    }
}

//if a new sprint is added the project is updated
function updateProject(sprintId) {
    if (!checkProjectExistance()) {
        createProject();
    }
    let project = localStorage.getItem("project");
    project = JSON.parse(project);
    let sprints = [];
    sprints.push(sprintId);
    project.sprints = sprints;
    localStorage.setItem("project", JSON.stringify(project));
}

//initializez the single project
function createProject() {
    let project = new Project(1, []);
    localStorage.setItem("project", JSON.stringify(project));
}

function checkProjectExistance() {
    let project = localStorage.getItem("project");
    if (project) {
        return true;
    }
    return false;
}

export function addIssue(type, name, sprintId, assigneeId, description, status, tasksId, updatedAt, createdAt) {
    let id = getLastIssueId() + 1;
    let createdBy = getCurrentUser();
    let comments = [];
    let newIssue = new Issue(id, type, name, sprintId, createdBy, assigneeId, description, status, tasksId, comments, updatedAt, createdAt);

    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    if (issueList) {
        issueList.push(newIssue);
        localStorage.setItem("issueList", JSON.stringify(issueList));
    } else {
        issueList = [];
        issueList.push(newIssue);
        localStorage.setItem("issueList", JSON.stringify(issueList));
    }
}

//get's the last issue id in order to create a new one. As issues cannot be deleted we can use the nr of the issues
// already created
function getLastIssueId() {
    let issueList = localStorage.getItem("issueList");
    if (!issueList) {
        return 0;
    }
    issueList = JSON.parse(issueList);
    return issueList[issueList.length - 1]._id;
}

function getCurrentUser() {
    currentUser = localStorage.getItem("curentUser");
    return currentUser;
}

export function checkIssueId(id) {
    let issueList = localStorage.getItem("issueList");
    if (issueList) {
        issueList = JSON.parse(issueList);
        for (let i = 0; i < issueList.length; i++) {
            if (id == issueList[i]._id) {
                return true;
            }
        }
        return false;
    }
    return false;
}

export function getIssueType(id) {
    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    for (let i = 0; i < issueList.length; i++) {
        if (id == issueList[i]._id) {
            return issueList[i]._type;
        }
    }
}

export function updateIssue(id, status, name, sprintId, assigneeId, description, tasksId, comment) {
    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    for (let i = 0; i < issueList.length; i++) {
        if (id == issueList[i]._id) {
            if (status)
                issueList[i]._status = status;
            if (name)
                issueList[i]._name = name;
            if (sprintId)
                issueList[i]._sprint = sprintId;
            if (assigneeId)
                issueList[i]._assignee = assigneeId;
            if (description)
                issueList[i]._description = description;
            if (tasksId)
                issueList[i]._tasks = tasksId;
            if (comment) {
                if (issueList[i]._comments instanceof Array)
                    issueList[i]._comments.push(comment);
                else {
                    let comments = [];
                    comments.push(comment);
                    issueList[i]._comments = comments;
                }
            }
            //get current date
            issueList[i]._updatedAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        }
    }
    localStorage.setItem("issueList", JSON.stringify(issueList));
}

//in order to update an issue with a comment we have to add the comment to our storage
export function createComment(comment) {
    let commentList = localStorage.getItem("commentList");
    if (commentList) {
        let newComment = new Comments(commentList.length + 1, comment);
        commentList = JSON.parse(commentList);
        commentList.push(newComment);
        localStorage.setItem("commentList", JSON.stringify(commentList));
        return commentList.length + 1;
    } else {
        commentList = [];
        let newComment = new Comments(1, comment);
        commentList.push(newComment);
        localStorage.setItem("commentList", JSON.stringify(commentList));
        return 1;
    }
}

export function updateStatus(status, id) {
    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    for (let i = 0; i < issueList.length; i++) {
        if (id == issueList[i]._id) {
            issueList[i]._status = status;
        }
    }
    localStorage.setItem("issueList", JSON.stringify(issueList));
}

export function getSubtasksStatuses(taskId) {
    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    let subtaskIds = [];
    for (let i = 0; i < issueList.length; i++) {
        if (taskId == issueList[i]._id) {
            subtaskIds = issueList[i]._tasks;
        }
    }
    let subtaskStatuses = [];
    if (subtaskIds instanceof Array) {
        for (let j = 0; j < subtaskIds.length; j++) {
            for (let k = 0; k < issueList.length; k++) {
                if (subtaskIds[j] == issueList[k]._id) {
                    subtaskStatuses.push(issueList[k]._status);
                }
            }
        }
    } else
    //if only one subtask we know for sure it is resolved
        return true;
}

// get the parent of a task
export function getParent(id) {
    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    for (let i = 0; i < issueList.length; i++) {
        let tasks = [];
        tasks = issueList._tasks;
        if (tasks instanceof Array) {
            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j] == id) {
                    return issueList[i]._id;
                }
            }
        } else {
            if (tasks == id) {
                return issueList[i]._id;
                ;
            }
        }
    }
    return null;
}

export function getIssues() {
    let issueList = localStorage.getItem("issueList");
    issueList = JSON.parse(issueList);
    return issueList;
}

export function refreshFiltred(filtred) {
    localStorage.setItem("filtred", JSON.stringify(filtred));
}

export function getSprints() {
    let sprintList = localStorage.getItem("sprintList");
    sprintList = JSON.parse(sprintList);
    return sprintList;
}
