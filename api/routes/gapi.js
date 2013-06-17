var gapiClient = require(process.cwd() + '/api/modules/gapiClient');

module.exports = function(app) {
	app.get('/gapi/authUrl', function(req, res) {
		var body = {
			//url: process.env.NODE_ENV ? 'http://localhost:4711/oauth2callback' : 'http://www.pocument.com/oauth2callback'
			url: gapiClient.generateAuthUrl()
		}
		res.send(200, body);
	});
};