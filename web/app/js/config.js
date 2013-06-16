// Set the require.js configuration for this application.
require.config({
	baseUrl: './',
	// Initialize the application with the main application file.
	deps: ['main'],

	paths: {
		// JavaScript folders.
		//components: '../js/components',
		//plugins: '../js/plugins',

		// Libraries.
		//jquery: 'components/jquery/jquery.min',
		//lodash: 'components/lodash/lodash',
		//backbone: 'components/backbone/backbone-min'
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		backbone: {
			deps: ['lodash', 'jquery'],
			exports: 'Backbone'
		}
	}
});