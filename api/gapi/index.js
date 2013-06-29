var gapiClient = require('./gapi'),
	config = require('./config'),
	User = require('../models/user');

module.exports = function(app) {
	// Get current environment.
	console.log('Building gapi', app.settings.env);

	// Initialize Google APIs module.
	gapiClient.initialize(config(app));

	// Listen for OPTIONS request.
	// app.options('/gapi/*', function(req, res) {
	// 	console.log('writing headers only');
	// 	res.header('Access-Control-Allow-Origin', '*');
	// 	res.header('Access-Control-Allow-Headers', '*');
	// 	res.end('');
	// });

	// app.get('/gapi/*', function(req, res) {
	// 	res.header('Access-Control-Allow-Origin', '*');
	// 	res.header('Access-Control-Allow-Headers', '*');
	// });

	// OAuth2 callback for Google APIs. Parse authorization code and request access token
	app.get('/gapi/oauth2callback', function(req, res) {
		// Log and return Google APIs access code in response.
		console.log(req.query);
		User.model.update({ email: 'isaaclee@pocument.com' }, { apis: { google: { authorization_code: req.query.code } } }, function(err, numberAffected) {
			if (err) {
				console.error(err);
			}
			console.log('Number of users affected: ', numberAffected);
		});

		// Redirect user to app after parsing authorization code.
		res.redirect('/app');
		
		// res.send(200, req.query.code);
	});

	// Retrieve an authentication URL for Google APIs service
	app.get('/gapi/authUrl', function(req, res) {
		var body = {
			url: gapiClient.generateAuthUrl()
		}
		res.send(200, body);
	});

	// Retrieve access tokens
	// TODO: wire up to DB instead of global test object
	app.get('/gapi/accessTokens', function(req, res) {
		var body = {};

		gapiClient.getAccessToken(function(err, tokens) {
			console.log('Google APIs tokens', tokens);
			if (err) {
				console.error(err);
				res.send(500, 'It didn\'t work');
			} else {
				body.tokens = tokens;
				res.send(200, body);
			}
		});
	});

	// Refresh access tokens for Google APIs
	// TODO: combine with retrieve so that access tokens will be automatically refreshed if expired
	app.get('/gapi/refreshTokens', function(req, res) {
		var body = {};

		gapiClient.refreshTokens(function(err, tokens) {
			console.log('Google APIs tokens', tokens);
			if (err) {
				console.error(err);
				res.send(500, 'It didn\'t work');
			} else {
				body.tokens = tokens;
				res.send(200, body);
			}
		});
	});

	// Establish connection to Gmail IMAP API
	// app.get('/gapi/imapGmail/connect', function(req, res) {
	// 	imapGmail.connect();
	// 	res.send(200, 'connected');
	// });
};