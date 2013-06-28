/** Module dependencies **/
var express = require('express'),
	path = require('path'),
	connect = require('connect'),
	// router = require('./router'),
	gapi = require('./gapi'),
	db = require('./db');

// Create server
var app = express();

// Configure server
app.configure(function() {
	// Turn on logger middleware.
	app.use(connect.logger('dev'));

	// Enable strict routing.
	app.enable('strict routing');
	
	// Parses request body and populates request.body
	app.use(express.bodyParser());

	// Checks request.body for HTTP method overrides
	app.use(express.methodOverride());

	// Perform route lookup based on URL and HTTP method
	app.use(app.router);

	// Setup API routes
	// router(app);

	// Use gapi modules
	gapi(app);

	app.get('/app', function(req, res) {
		res.redirect('/app/');
	});

	// Where to serve static content
	app.use('/app/', connect.static(path.join(process.cwd(), 'web/app')));
	app.use(connect.static(path.join(process.cwd(), 'web/public')));

	// Show all errors in development
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure(function() {
		app.use(express.logger({ format: ':method :url :status' }));
});

module.exports = app;