// Force the test environment to 'test'.
process.env.NODE_ENV = 'test';

// Module dependencies.
var request = require('superagent'),
	chai = require('chai'),
	expect = chai.expect;

describe('Users controller', function() {
	it('Creates a new user', function() {
		expect(user).to.exist;
		expect(user.first_name).to.equal('Isaac Lee');
		expect(user.last_name).to.equal('Morris');
	});
});