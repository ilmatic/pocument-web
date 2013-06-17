module.exports = function(app) {
	var main = require('./main')(app);
	var gapi = require('./gapi')(app);
};