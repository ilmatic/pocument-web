/** Module dependencies **/
var googleapis = require('googleapis'),
	OAuth2Client = googleapis.OAuth2Client,
	oauth2Client;

// Sample access_code returned from oauth2callback
var access_code = '4/92qwTfffUjLh995Jg_EDEO6UphUC.ojoRmDhPug0eMqTmHjyTFGM0f6jHfgI';

console.log('NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
	// Module initialization.
	initialize: function(config) {
		// Check if config argument contains all the necessary properties, then instantiate new OAuth2Client with config and store as local variable.
		if (config.client_id && config.client_secret && config.redirect_url) {
			oauth2Client = new OAuth2Client(config.client_id, config.client_secret, config.redirect_url);
			oauth2Client.opts = config;
		}
	},
	// Generate authorization url for Google APIs.
	generateAuthUrl: function() {
		if (oauth2Client && oauth2Client.opts) {
			var opts = oauth2Client.opts;
			return oauth2Client.generateAuthUrl({
				access_type: opts.access_type,
				scope: opts.scope
			});
		}

		return 'OAuth2 client not initialized.';
	},
	getAccessToken: function() {
		var token = oauth2Client.getToken(access_code, callback);
	},
	refreshTokens: function() {
		var refresh_token = '1/mCbhIDZhd1GukrmDsBh4aG-G-RuhHqUz1dnp5ZcaHPE';
oauth2Client.refreshTokens(refresh_token, callback);
	}
};