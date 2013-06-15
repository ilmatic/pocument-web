// Module dependencies
var app_root = process.cwd();
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define([
	'express',
	'path'
], function(express, path) {

	// Create server
	var app = express();

	// Configure server
	app.configure(function() {
		// Parses request body and populates request.body
		app.use(express.bodyParser());

		// Checks request.body for HTTP method overrides
		app.use(express.methodOverride());

		// Perform route lookup based on URL and HTTP method
		app.use(app.router);

		// Where to serve static content
		app.use(express.static(app_root));
		app.use(express.static(path.join(app_root, 'www')));

		// Show all errors in development
			app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		});

		app.configure(function() {
			app.use(express.logger({ format: ':method :url :status' }));
	});

	return app;
});