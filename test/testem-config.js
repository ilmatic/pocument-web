require.config({
	paths: {
		baseUrl: 'test',
		// Javascript folders.
		components: '../web/app/js/components',
		plugins: '../web/app/js/plugins',

		// Libraries.
		jquery: 'components/jquery/jquery.min',
		lodash: 'components/lodash/lodash',
		backbone: 'components/backbone/backbone-min',

		// Testing frameworks.
		chai: 'js/lib/chai',

		shim: {
			// Backbone library depends on lodash and jQuery.
			backbone: {
				deps: ['lodash', 'jquery'],
				exports: 'Backbone'
			}
		}
	}
});

require([
	'specs/client/welcomeSpec'
], function(welcomeSpec) {
	console.log('Hello Test\'em config');
});