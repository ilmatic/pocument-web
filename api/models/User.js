/** Module dependencies **/
var mongoose = require('mongoose');

// Setup schema for User object
var userSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	apis: {
		google: {
			authorization_code: String,
			tokens: {
				access_token: String,
				expires_in: Number,
				id_token: String,
				refresh_token: String,
				token_type: String
			}
		}
	}
});

var User = mongoose.model('User', userSchema);

module.exports = {
	foo: 'bar',
	schema: userSchema,
	model: User,
	newUser: function(opts) {
		return new User(opts);
	}
};