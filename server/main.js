requirejs = require('requirejs');
if (typeof define !== 'function') {
	define = require('amdefine')(module);
}

requirejs.config({
	// Pass the top-level main.js/index.js require
	// function to requirejs so that node modules
	// are loaded relative to the top-level JS file.
	nodeRequire: require
});

requirejs([
	'app'
], function(app) {
	var port = 4711;
	app.listen(port, function() {
		console.log('Express server listening on port %d in the %s mode', port, app.settings.env);
	});
});