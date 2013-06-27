module.exports = function(app) {
	//var main = require('./routes/main')(app);
	var gapi = require('./routes/gapi')(app);
};

// define([
// 	'./routes/main',
// 	'./routes/gapi'
// ], function(mainRouter, gapiRouter) {
// 	return function(app) {
// 		mainRouter(app);
// 		gapiRouter(app);
// 	};
// });