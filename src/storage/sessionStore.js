const Session = require("../models/SessionModel.js");
class SessionStore {
	constructor () {
		this.sessions = new Map();
		Session.find({}, (error, s) => s.forEach(i => this.sessions.set(i.sessionId, i)));
		console.log("Loaded Sessions: ");
		this.sessions.forEach((k,v) => console.log(k +"  "+v));
	}

	findSession (id) {
		return this.sessions.get(id);
	}

	saveSession (id, session) {
		console.log("saving: " + id + " as " + session.userId);
		this.sessions.set(id, session);
		new Session(session).save((err, b) => console.log("saved on db: " + b + "error: " + err));
	}

	findAllSessions () {
		return [...this.sessions.values()];
	}
}

module.exports = new SessionStore();
