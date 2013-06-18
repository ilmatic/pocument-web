var expect = chai.expect;

describe('Hello World Test', function() {
	it('is a test to ensure that basic setup for Test\'em is complete.', function() {
		expect(true).to.be.ok;
		expect(false).to.not.be.ok;
	});

	it('has a small asynchronous test', function(done) {
		setTimeout(function() {
			expect(true).to.be.ok;
			done();
		}, 1500);
	});
});