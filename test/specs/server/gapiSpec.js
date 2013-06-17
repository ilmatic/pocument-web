// Force the test environment to 'test'.
process.env.NODE_ENV = 'test';

// Get the application server module.
var request = require('superagent'),
	chai = require('chai'),
	expect = chai.expect;

describe('Google APIs', function() {
	describe('GAPI Service', function() {
		it('should return a url', function(done) {
			request.get('http://localhost:4711/gapi/authUrl').end(function(res) {
				console.log('Response body: ', res.body);

				expect(res).to.exist;
				expect(res.status).to.equal(200);
				expect(res.body.url).to.contain('localhost');
				done();
				
			});
		});
	});
});