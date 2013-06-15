var tests = Object.keys(window.__karma__.files).filter(function(file) {
	return (/\/spec\/\w*\.js$/).test(file);
});

console.log(tests);

requirejs.config({
	// Karma serves files from '/base'.
	baseUrl: '/base',
	paths: {
		// JavaScript folders.
		components: 'app/js/components',
		plugins: 'app/js/plugins',

		// Libraries.
		jquery: 'components/jquery/jquery.min',
		lodash: 'components/lodash/lodash',
		backbone: 'components/backbone/backbone-min',

		// Test frameworks
		mocha: 'test/js/mocha',
		chai: 'test/js/chai',

		spec: 'test/spec'
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		backbone: {
			deps: ['lodash', 'jquery'],
			exports: 'Backbone'
		}
	},

	// Ask RequireJS to load these files (all our tests).
	deps: tests,

	// Start test run, once RequireJS is done.
	callback: window.__karma__.start
});