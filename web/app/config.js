// Set the require.js configuration for this application.
require.config({
	baseUrl: '/',
	// Initialize the application with the main application file.
	deps: ['app/main'],

	paths: {
		// // JavaScript folders. This configuration can be ignored for now because express will serve **components** directly from **public**
		// components: '../js/components',
		// plugins: '../js/plugins',

		// Common folders.
		views: 'app/views',
		models: 'app/models',
		collections: 'app/collections',
		templates: 'app/templates',

		// Libraries.
		jquery: 'js/components/jquery/jquery.min',
		lodash: 'js/components/lodash/lodash',
		backbone: 'js/components/backbone/backbone-min',
		text: 'js/components/requirejs-text/text',
		handlebars: 'js/components/handlebars/handlebars'
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		backbone: {
			deps: ['lodash', 'jquery'],
			exports: 'Backbone'
		},
		handlebars: {
			exports: 'Handlebars'
		}
	}
});