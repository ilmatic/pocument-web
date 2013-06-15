// Force the test environment to 'test'.
process.env.NODE_ENV = 'test';

// Get the application server module.
var chai = require('chai'),
	expect = chai.expect;

describe('Home page', function() {
	it('should respond to fictional tests', function() {
		expect(true).to.be.ok;
	});
	it('should exist');
	it('should have a login form');
});