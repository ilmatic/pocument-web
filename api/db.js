/** Module dependencies **/
var mongoose = require('mongoose');

// Open connection to local MongoDB instance.
mongoose.connect('mongodb://localhost/pocumentapp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	// Connection established.
	console.log('Mongoose connected');

	var userSchema = mongoose.Schema({
		email: String,
		password: String,
		first_name: String,
		last_name: String
	});

	var User = mongoose.model('User', userSchema);

	// Clean up user collection before populatiing.
	User.remove({}, function(err) {});

	var me = new User({
		email: 'isaaclee@pocument.com',
		password: 'Merlot00',
		first_name: 'Isaac Lee',
		last_name: 'Morris'
	});

	me.save(function(err, me) {
		if (err) {
			console.err(err);
		} else {
			console.log(me);
		}
	});
});