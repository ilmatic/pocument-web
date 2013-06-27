/** Module dependencies **/
var mongoose = require('mongoose')
	User = require('./models/user');

// Open connection to local MongoDB instance.
mongoose.connect('mongodb://localhost/pocumentapp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	// Connection established.
	console.log('Mongoose connected');

	// Test if user object is being instantiated properly.
	// console.log('User schema: ', User.schema);
	// console.log('User foo:', User.foo);

	// Clean up user collection before populatiing.
	User.model.remove({}, function(err) {});

	// Create sample user.
	var me = User.newUser({
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