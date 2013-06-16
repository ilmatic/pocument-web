require.config({
	paths: {
		// JavaScript folders.
		components: '../web/app/js/components',
		plugins: '../web/app/js/plugins',

		// Libraries.
		jquery: 'components/jquery/jquery.min',
		lodash: 'components/lodash/lodash',
		backbone: 'components/backbone/backbone-min',

		chai: 'js/lib/chai'
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		backbone: {
			deps: ['lodash', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require([
	'specs/wombat', 
	'specs/apple'
],

function() {
	// Initialize the run. Check if running in PhantomJS.
	if (window.mochaPhantomJS) {
		mochaPhantomJS.run();
	} else {
		mocha.run();
	}
});