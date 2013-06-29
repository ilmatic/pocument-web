var tests = Object.keys(window.__karma__.files).filter(function(file) {
	return (/\/Spec\/\w*\.js$/).test(file);
});

console.log(tests);

requirejs.config({
	// Karma serves files from '/base'.
	baseUrl: '/base',
	paths: {
		// JavaScript folders.
		// components: 'web/public/js/components',
		angular: 'web/public/js/components/angular-complete/angular.min',
		angularMocks: 'web/public/js/components/angular-complete/angular-mocks',

		// Test frameworks
		// mocha: 'test/public/js/lib/mocha',
		chai: 'test/public/js/lib/chai'
	},

	shim: {
		angular: {
			exports: 'angular'
		},
		angularMocks: {
			deps: ['angular'],
			exports: 'angular.mock'
		}
	},

	priority: [
		'angular'
	]

	// Ask RequireJS to load these files (all our tests).
	// deps: tests,

	// Start test run, once RequireJS is done.
	// callback: window.__karma__.start
});

require([
	'angular',
	'angularMocks',
	'test/web/unit/controllers/settingsSpec'
], function() {
	window.__karma__.start();
});

