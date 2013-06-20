if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require) {
	var requirejs = require('requirejs'),
		googleapis = require('googleapis'),
		OAuth2Client = googleapis.OAuth2Client;

	var config = {
		client_id: '589560084010-mtg3385sggmfcq1gu61kpcc3qabs6c2a.apps.googleusercontent.com',
		client_secret: 'JId4ORKHdguXplSDZ30uwU6J',
		redirect_url: 'http://localhost:4471/oauth2callback',
		scope: 'https://www.googleapis.com/auth/plus.me',
		access_type: 'offline'
	};

	var oauth2Client = new OAuth2Client(config.client_id, config.client_secret, config.redirect_url);

	// Generates a url that allows offline access
	// and asks permissions for Google+ scope.
	var url = oauth2Client.generateAuthUrl({
		access_type: config.access_type,
		scope: config.scope
	});

	// The value returned from the function is
	// used as the module export visible to Node.
	return function() {
		this.url = url;
	};
});