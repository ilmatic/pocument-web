// Web server for PocumentApp. This is strictly used
// for serving up static content, and does not include
// API functions.

// Module dependencies.
var express = require('express'),
	path = require('path'),
	connect = require('connect'),
	port = 4711;

// Create server.
var app = express();

// Configure web server.
app.configure(function() {
	// Turn on logger middleware.
	app.use(express.logger('dev'));

	// Enable strict routing.
	app.enable('strict routing');

	// Parses request body and populates request.body.
	app.use(express.bodyParser());

	// Checks request.body for HTTP method overrides.
	app.use(express.methodOverride());

	app.get('/app', function(req, res) {
		res.redirect('/app/');
	});

	// Where to serve static content.
	app.use('/app/', connect.static(path.join(process.cwd(), 'web/<%= static.target %>/app')));
	app.use(connect.static(path.join(process.cwd(), 'web/<%= static.target %>/public')));

	// Show all errors in development.
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

// Start server.
app.listen(port, function() {
	console.log('Express web server listening on port %d in the %s mode', port, app.settings.env);
});

