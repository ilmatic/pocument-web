// Module dependencies.
var express = require('express'),
	path = require('path'),
	connect = require('connect'),
	// router = require('./router'),
	gapi = require('./gapi'),
	db = require('./db');

// Create server.
var app = express();

// CORS middleware.
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
	next();
};

// Configure server.
app.configure(function() {
	// Turn on logger middleware.
	app.use(connect.logger('dev'));

	// Enable strict routing.
	app.enable('strict routing');
	
	// Parses request body and populates request.body.
	app.use(express.bodyParser());

	// Checks request.body for HTTP method overrides.
	app.use(express.methodOverride());

	// Allow cross domain API requests.
	app.use(allowCrossDomain);
	app.options('*', function(req, res) {
		res.send(200);
	});

	// Perform route lookup based on URL and HTTP method.
	app.use(app.router);

	// Setup API routes
	// router(app);

	// Use gapi modules.
	gapi(app);

	// Show all errors in development.
	// 	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	// });

	// app.configure(function() {
	// 	app.use(express.logger({ format: ':method :url :status' }));
});

module.exports = app;