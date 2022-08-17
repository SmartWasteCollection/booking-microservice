class SessionStore {
	constructor () {
		this.sessions = new Map();
	}

	findSession (id) {
		return this.sessions.get(id);
	}

	saveSession (id, session) {
		console.log("saving: " + id + " as " + session.userId);
		this.sessions.set(id, session);
	}

	findAllSessions () {
		return [...this.sessions.values()];
	}
}

module.exports = new SessionStore();
