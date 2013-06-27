// Configuration data for Google APIs client.
module.exports = function(app) {
	return {
		client_id: '589560084010-mtg3385sggmfcq1gu61kpcc3qabs6c2a.apps.googleusercontent.com',
		client_secret: 'JId4ORKHdguXplSDZ30uwU6J',
		redirect_url: app.settings.env == 'development' ? 'http://localhost:4711/oauth2callback' : 'http://www.pocument.com/oauth2callback',
		scope: 'https://www.googleapis.com/auth/plus.me https://mail.google.com/',
		access_type: 'offline'
	};
};