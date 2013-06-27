// Force the test environment to 'test'.
process.env.NODE_ENV = 'test';

// Module dependencies.
var request = require('superagent'),
	chai = require('chai'),
	expect = chai.expect;

describe('Google APIs', function() {
	describe('GAPI service', function() {
		it('returns an authentication url', function(done) {
			request.get('http://localhost:4711/gapi/authUrl').end(function(res) {
				console.log('Response body: ', res.body);

				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body.url).to.contain('localhost');
				done();
				
			});
		});
	});
	describe('Gmail IMAP service', function() {
		it('takes an access token and retrieves an initial response from Gmail server', function(done) {
			expect(access_token).to.exist;
			gmailImap(access_token, function(res) {
				expect(res).to.exist;
				expect(res.status).to.equal('OK');
			});
		});
	});
});