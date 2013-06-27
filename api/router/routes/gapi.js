var gapiClient = require('../../gapi'),
	imapGmail = require('../../imapGmail');

module.exports = function(app) {
	// OAuth2 callback for Google APIs. Parse authorization code and request access token
	// TODO: create separate callbacks for different services, for now maps to Google APIs
	app.get('/gapi/oauth2callback', function(req, res) {
		console.log(req.query);
		res.send(200, req.query.code);
	});

	// Retrieve an authentication URL for Google APIs service
	app.get('/gapi/authUrl', function(req, res) {
		var body = {
			//url: process.env.NODE_ENV ? 'http://localhost:4711/oauth2callback' : 'http://www.pocument.com/oauth2callback'
			url: gapiClient.generateAuthUrl()
		}
		res.send(200, body);
	});

	// Retrieve access tokens
	// TODO: wire up to DB instead of global test object
	app.get('/gapi/accessTokens', function(req, res) {
		var body = {

		};

		gapiClient.getAccessToken(function(err, tokens) {
			console.log('Gmail callback called');
			console.log(tokens);
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
		gapiClient.refreshTokens(function(err, tokens) {
			console.log('Gmail callback called');
			console.log(tokens);
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
	app.get('/gapi/imapGmail/connect', function(req, res) {
		imapGmail.connect();
		res.send(200, 'connected');
	});
};

// define([
// 	'api/modules/gapiClient'
// ], function(gapiClient) {
// 	return function(app) {
// 		app.get('/gapi/authUrl', function(req, res) {
// 			// Generate body with authUrl from gapiClient
// 			var body = {
// 				url: gapiClient.generateAuthUrl()
// 			};

// 			// Send body with authUrl in response
// 			res.send(200, body);
// 		});
// 	};
// });