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
		angular: 'js/components/angular/angular.min'
	},

	shim: {
		angular: {
			exports: 'angular'
		}
	},

	// I don't know what this does yet, but it's in the angular-requirejs seed so I'm using it.
	// Guessing it determines the loading order?
	priority: [
		'angular'
	]
});