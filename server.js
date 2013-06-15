// Module dependencies
var app_root = __dirname,
	express = require('express'),
	path = require('path');

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
	//app.use(express.static(path.join(app_root, 'app')));
	//app.use(express.static(path.join(app_root, 'test')));
	app.use(express.static(app_root));
	app.use(express.static(path.join(app_root, 'www')));

	// Show all errors in development
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Start server
var port = 4711;
app.listen(port, function() {
	console.log('Express server listening on port %d in the %s mode', port, app.settings.env);
});
