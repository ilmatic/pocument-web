// Force the test environment to 'test'.
process.env.NODE_ENV = 'test';

// Get the application server module.
var chai = require('chai'),
	gapiClient = require('gapiClient'),
	expect = chai.expect;

var gapiConfig = {
	client_id: '589560084010-mtg3385sggmfcq1gu61kpcc3qabs6c2a.apps.googleusercontent.com',
	client_secret: 'JId4ORKHdguXplSDZ30uwU6J',
	redirect_url: 'http://localhost:4471/oauth2callback',
	scope: 'https://www.googleapis.com/auth/plus.me',
	access_type: 'offline'
};

describe('Google APIs', function() {
	describe('GapiClient', function() {
		it('should exist', function() {
			expect(gapiClient).to.exist;
		});
		describe('#gapiConfig', function() {
			it('should exist', function() {
				expect(gapiConfig).to.exist;
			});
		});
		describe('#authorize', function() {
			it('should generate an OAuth 2.0 url for accessing Google services', function() {
				
			});
		});
	});
	
});