module.exports = function(app) {
	app.get('/gapi/authUrl', function(req, res) {
		if (process.env.NODE_ENV === 'test') {
			res.send(200, 'http://localhost:4471');
		}
	});
};