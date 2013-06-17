// Module dependencies
var app_root = __dirname,
	express = require('express'),
	connect = require('connect'),
	path = require('path');

// Create server and load in router
var app = express(),
	router = require('./api/routes')(app);

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
	//app.use(express.static(path.join(app_root, 'app')));
	//app.use(express.static(path.join(app_root, 'test')));
	app.use(express.static(app_root));
	app.use(express.static(path.join(app_root, 'web')));
	app.use(express.static(path.join(app_root, 'dist')));

	// Show all errors in development
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

	// app.get('/gapi/authUrl', function(req, res) {
	// 	var body = {
	// 		url: process.env.NODE_ENV ? 'http://localhost:4711' : 'http://www.pocument.com'
	// 	}
	// 	res.send(200, body);
	// });
});

// Start server
var port = 4711;
app.listen(port, function() {
	console.log('Express server listening on port %d in the %s mode', port, app.settings.env);
});
