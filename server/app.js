// Module dependencies
var app_root = process.cwd();

define([
	'express',
	'path',
	'connect'
], function(express, path, connect) {

	// Create server
	var app = express();

	// Configure server
	app.configure(function() {
		// Turn on logger middleware.
		app.use(connect.logger('dev'));

		// Parses request body and populates request.body
		app.use(express.bodyParser());

		// Checks request.body for HTTP method overrides
		app.use(express.methodOverride());

		// Perform route lookup based on URL and HTTP method
		app.use(app.router);

		// Where to serve static content
		app.use(express.static(path.join(app_root, 'web')));
		app.use(express.static(path.join(app_root, 'dist')));
		app.use(express.static(path.join(app_root, 'web/public')));

		// Show all errors in development
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	return app;
});