// Set the require.js configuration for this application.
require.config({
	baseUrl: '/',
	// Initialize the application with the main application file.
	deps: ['app/main'],

	paths: {
		// // JavaScript folders. This configuration can be ignored for now because express will serve **components** directly from **public**
		// components: '../js/components',
		// plugins: '../js/plugins',

		// Libraries.
		jquery: 'js/components/jquery/jquery.min',
		lodash: 'js/components/lodash/lodash',
		backbone: 'js/components/backbone/backbone-min'
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		backbone: {
			deps: ['lodash', 'jquery'],
			exports: 'Backbone'
		}
	}
});