import {
    addIssue,
    addStatuses,
    addUsers,
    checkIssueId,
    checkSprint,
    checkUser,
    createComment,
    createSprint,
    getIssues,
    getIssueType,
    getParent,
    getSprints,
    getSubtasksStatuses,
    refreshFiltred,
    statusesExist,
    updateIssue,
    updateStatus,
    usersExist
} from '../Repository/Repository.js';

import {mainAddress} from "../Utils/Globals.js";

export function checkId(userId) {
    //check if user exists
    if (checkUser(userId)) {
        //redirect to menu
        return window.location.href = mainAddress + "menu.html";
    }
}

// initialize some users
export function createUsers() {
    if (!usersExist()) {
        let nameList = ['Mihai', 'Andrei', 'Robert', 'Stefan', 'Razvan', 'Alexandru', 'Andreea', 'Diana', 'George', 'Ruxandra'];
        addUsers(nameList);
    }
}

// initialize possible statuses
export function createStatuses() {
    if (!statusesExist()) {
        let statusesList = ['New', 'In progress', 'Feedback', 'Rework', 'Resolved', 'Ready for Testing'];
        addStatuses(statusesList);
    }
}

//if sprint doesn't exist it creates one and return to menu
export function checkSprintExists(sprintName) {
    if (checkSprint(sprintName)) {
        createSprint(sprintName);
        return window.location.href = mainAddress + "menu.html";
    }
    return false;
}

// get current tme and format input for adding issue
export function createIssue(type, name, sprintId, assigneeId, description, tasksId) {
    let status = 1;
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let updatedAt = utc;
    let createdAt = utc;
    if (tasksId) {
        tasksId = tasksId.split(',');
    }
    addIssue(type, name, sprintId, assigneeId, description, status, tasksId, updatedAt, createdAt);
    window.location.href = mainAddress + "menu.html";
}

// determines the type of updated entity and it's validity
export function checkUpdate(id, status, name, sprintId, assigneeId, description, tasksId, comment) {
   //check if issue id exists
    if (checkIssueId(id)) {
        let type = getIssueType(id);
        if (comment) {
            // var comment gets the id of the newly created comment object
            comment = createComment(comment);
        }
        //if type is task => must not have subtasks or a sprint id to be updated(task inherits sprint id from issue)
        if (type == "task") {
            if (checkTaskUpdate(tasksId, sprintId)) {
                updateIssue(id, status, name, sprintId, assigneeId, description, tasksId, comment);
                // make further checks in case status is updated
                if (status) {
                    if (getParent(id) != null) {
                        updateStatus(status, getParent(id));
                        if (status == 5) {
                            //if all 'brother' tasks are in resolved state, change parent state to ready for testing
                            if (checkResolvedState(getParent(id))) {
                                //status id 6 is the id for "Ready for Testing"
                                updateStatus(6, getParent(id));
                            }
                        }
                    }
                }
                window.location.href = mainAddress + "menu.html";
            }
        } else {
            updateIssue(id, status, name, sprintId, assigneeId, description, tasksId.split(','), comment);
            window.location.href = mainAddress + "menu.html";
        }

    }
}

//checks if task is updated corectlly
function checkTaskUpdate(tasksId, sprintId) {
    if (sprintId != undefined) {
        return false;
    }
    if (tasksId != undefined) {
        return false;
    }
    return true;
}

//check if brother tasks have resolve status
function checkResolvedState(task) {
    let subtasksStatuses = getSubtasksStatuses(task);
    if (subtasksStatuses instanceof Array) {
        for (let i = 0; i < subtasksStatuses.length; i++) {
            //5 is the id for resolved status
            if (subtasksStatuses[i] != 5) {
                return false;
            }
        }
        return true;
    }
    //if only one subtask exists, return true
    return true;
}

//filter issues by parameters and return mathces
export function filterIssues(sprint, status) {
    let issueList = getIssues();
    let filtred = [];
    for (let i = 0; i < issueList.length; i++) {
        if ((issueList[i]._sprint == sprint || sprint == null) && (issueList[i]._status == status || status == null))
            filtred.push(issueList[i]._name);
    }
    //update storage of filtred results
    refreshFiltred(filtred);
    window.location.href = mainAddress + "filtred.html";
}

//create an array with overview data for easy formating
export function generateOverview() {
    let bugs = getBugs();
    let features = getFeatures();
    let newIssues = getNewIssues();
    let inProgressIssues = getInProgressIssues();
    let feedbackIssues = getFeedbackIssues();
    let reworkIssues = getReworkIssues();
    let resolvedIssues = getResolvedIssues();
    let sprints = getSprints();
    let generatedOverview = [[]];

    //set each sprint as a key
    for (let i = 0; i < sprints.length; i++) {
        generatedOverview[sprints[i].name] = [];
    }
    //at each key format the neccesary output in an array
    for (let i = 0; i < sprints.length; i++) {
        let j = 0;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, bugs));
        generatedOverview[sprints[i].name][j] += "bugs";
        j++;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, features));
        generatedOverview[sprints[i].name][j] += "features";
        j++;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, newIssues));
        generatedOverview[sprints[i].name][j] += "new";
        j++;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, inProgressIssues));
        generatedOverview[sprints[i].name][j] += "in progress";
        j++;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, feedbackIssues));
        generatedOverview[sprints[i].name][j] += "feedback";
        j++;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, reworkIssues));
        generatedOverview[sprints[i].name][j] += "rework";
        j++;
        generatedOverview[sprints[i].name].push(count(sprints[i].id, resolvedIssues));
        generatedOverview[sprints[i].name][j] += "resolved";
        j++;
    }
    generatedOverview = manipulate(generatedOverview);
    return generatedOverview;
}

// reformat array to be linear
function manipulate(generatedOverview) {
    let manipulatedOverview = [];
    for (let i = 0; i < generatedOverview.length; i++) {
        //put keys in the manipulated array
        manipulatedOverview.push(Object.keys(manipulatedOverview)[i]);
        //parse to elements of each key
        for (let j = 0; j < generatedOverview[(Object.keys(manipulatedOverview)[i])].length; j++) {
            //push them to the manipulated array
            manipulatedOverview.push(generatedOverview[(Object.keys(manipulatedOverview)[i])][j])
        }
    }

    return manipulatedOverview;
}

function count(sprint, array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (sprint == array._sprint) {
            count++;
        }
    }
    return count;
}

export function getBugs() {
    let issues = getIssues();
    let bugs = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].type == "bug") {
            bugs.push(issues[i]);
        }
    }
    return bugs;
}

export function getFeatures() {
    let issues = getIssues();
    let features = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].type == "feature") {
            features.push(issues[i]);
        }
    }
    return features;
}

export function getNewIssues() {
    let issues = getIssues();
    let newIssues = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].status == 1) {
            newIssues.push(issues[i]);
        }
    }
    return newIssues;
}

export function getInProgressIssues() {
    let issues = getIssues();
    let inProgressIssues = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].status == 2) {
            inProgressIssues.push(issues[i]);
        }
    }
    return inProgressIssues;
}

export function getFeedbackIssues() {
    let issues = getIssues();
    let feedbackIssues = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].status == 3) {
            feedbackIssues.push(issues[i]);
        }
    }
    return feedbackIssues;
}

export function getReworkIssues() {
    let issues = getIssues();
    let reworkIssues = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].status == 4) {
            reworkIssues.push(issues[i]);
        }
    }
    return reworkIssues;
}

export function getResolvedIssues() {
    let issues = getIssues();
    let resolvedIssues = [];
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].status == 4) {
            resolvedIssues.push(issues[i]);
        }
    }
    return resolvedIssues;
}