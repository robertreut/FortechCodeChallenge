class Issue {
    constructor(id, type, name, sprint, createdBy, assignee, description, status, tasks, comments, updatedAt, createdAt) {
        this._id = id;
        this._type = type;
        this._name = name;
        this._sprint = sprint;
        this._createdBy = createdBy;
        this._assignee = assignee;
        this._description = description;
        this._status = "New";
        this._tasks = tasks;
        this._comments = comments;
        this._updatedAt = updatedAt;
        this._createdAt = createdAt;

    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get sprint() {
        return this._sprint;
    }

    set sprint(sprint) {
        this._sprint = sprint;
    }

    get createdBy() {
        return this._createdBy;
    }

    set createdBy(createdBy) {
        this._createdBy = createdBy;
    }

    get assignee() {
        return this._assignee;
    }

    set assignee(assignee) {
        this._assignee = assignee;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(tasks) {
        this._tasks = tasks;
    }

    get comments() {
        return this._comments;
    }

    set comments(comments) {
        this._comments = comments;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(updatedAt) {
        this._updatedAt = updatedAt;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }


}

export default Issue;
