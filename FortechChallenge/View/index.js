import {checkId, createStatuses, createUsers} from '../Controller/Controller.js';

window.onload = function () {
    //instantiate some users
    createUsers();
    createStatuses();

    document.getElementById("signIn").onclick = function () {
        let userID = document.getElementById("userID").elements[0].value;
        checkId(userID);
    };
};


