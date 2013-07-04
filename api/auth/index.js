var login = require('./login');

module.exports = function(app) {
	// Get current environment.
	console.log('Building auth', app.settings.env);

	// Listen for post request of login credentials.
	app.post('/auth/login', function(req, res) {
		// Setup dummy credential for now.
		// TODO: hook this up to Mongo to do true authentication.
		console.log('Request: ', req.body);
		if (req.body.credentials.username == 'TestUser' && req.body.credentials.password == 'Welcome1') {
			var body = {
				authToken: 'abc123'
			};
			res.send(200, body);
		} else {
			res.send(401, 'Incorrect username or password.');
		}
	});
};