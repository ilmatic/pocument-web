// Force the test environment to 'test'.
process.env.NODE_ENV = 'test';

// Get the application server module.
var request = require('superagent'),
	chai = require('chai'),
	expect = chai.expect;

describe('Google APIs', function() {
	describe('GAPI Service', function() {
		it('should return a url', function() {
			request.get('localhost:4471/gapi/authUrl').end(function(res) {
				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body).to.contain('localhost');
			});
		});
	});
	
});