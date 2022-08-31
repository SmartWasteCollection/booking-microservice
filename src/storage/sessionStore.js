const Session = require("../models/SessionModel.js");
class SessionStore {
	constructor () {
		this.sessions = new Map();
		Session.find({}, (error, s) => {
			s.forEach(i => this.sessions.set(i.sessionId, i));
			console.log("Loaded Session: "+ this.sessions.size);
		});
	}

	findSession (id) {
		return this.sessions.get(id);
	}

	saveSession (id, session) {
		console.log("saving: " + id + " as " + session.userId);
		this.sessions.set(id, session);
		new Session(session).save((err, b) => {
			if (err) throw new Error("An error occurs trying to save session. " + err);
			if (b != null) console.log("Session saved successfully");
		});
	}

	findAllSessions () {
		return [...this.sessions.values()];
	}
}

module.exports = new SessionStore();
