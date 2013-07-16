'use strict';

var expect = chai.expect;

describe('Session module', function () {
	describe('SessionProvider', function () {
		var sessionProvider,
			test = { key: 'test', value: 'abc123' };

		beforeEach(function () {
			module('App.Session');
		});

		beforeEach(inject(function (SessionProvider) {
			sessionProvider = SessionProvider;
			sessionProvider.setCookie(test.key, test.value);
		}));

		describe('getCookie(key)', function () {

			it('should return the value stored for the key specified.', function () {
				var value = sessionProvider.getCookie('test');
				expect(value).to.equal(test.value);
			});

			it('should return undefined if cookie does not exist.', function () {
				var value = sessionProvider.getCookie('no_cookie');
				expect(value).to.be.undefined;
			});

			it('should return an empty string if key is invalid.', function () {
				var value = sessionProvider.getCookie('');
				expect(value).to.equal('');
			});

		});

		describe('setCookie(key, value)', function () {

			it('should change the value of the stored key.', function () {
				var value = sessionProvider.setCookie('test', 'def456');
				expect(value).to.equal('def456');

				var emptyValue = sessionProvider.setCookie('test', '');
				expect(emptyValue).to.equal('');
			});

			it('should return undefined if key is invalid.', function () {
				var value = sessionProvider.setCookie('', 'def456');
				expect(value).to.equal('');
			});
		});

		describe('resetCookie(key)', function () {
			it ('should return undefined', function () {
				var value = sessionProvider.resetCookie('test');
				expect(value).to.be.undefined;
			});
		});
	});
});