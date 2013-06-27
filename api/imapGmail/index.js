var Imap = require('imap'),
	inspect = require('util').inspect;

var tokens = {
	access_token: 'ya29.AHES6ZQfS4X-b4S_GvzwXEp82D3wclkX_bsfnaFoVAIwEMfHQA',
	expires_in: 3600,
	id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkZTA1OTc2M2VhNDViMmIwY2I5NDg2M2YyZjkwMDAyYTc0MWE2YWMifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwidG9rZW5faGFzaCI6IlBnMGxBMVljbWthN0lYcWZVZUJXSEEiLCJhdF9oYXNoIjoiUGcwbEExWWNta2E3SVhxZlVlQldIQSIsImNpZCI6IjU4OTU2MDA4NDAxMC1tdGczMzg1c2dnbWZjcTFndTYxa3BjYzNxYWJzNmMyYS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF6cCI6IjU4OTU2MDA4NDAxMC1tdGczMzg1c2dnbWZjcTFndTYxa3BjYzNxYWJzNmMyYS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImlkIjoiMTE2NTE1MjcxMTQ4NTQ0MjQ5MjI4Iiwic3ViIjoiMTE2NTE1MjcxMTQ4NTQ0MjQ5MjI4IiwiYXVkIjoiNTg5NTYwMDg0MDEwLW10ZzMzODVzZ2dtZmNxMWd1NjFrcGNjM3FhYnM2YzJhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaWF0IjoxMzcxNzY5MDQyLCJleHAiOjEzNzE3NzI5NDJ9.gaduT6TUQ68wBA7-UnEpdWshk11EHSmZhLkvLqIwFQqdNtj-LLOUnp_XIQSYAyQgxJJ8DBS0OQf-z6GlULRspLvcgxVNjhaZjwSvvJBmR4aD6nDgEvsdn6Omawa16pX76ZLEvLVsLnZZt9pyOa-bmxeAoPvlijrB1MmAgX91kdk',
	refresh_token: '1/mCbhIDZhd1GukrmDsBh4aG-G-RuhHqUz1dnp5ZcaHPE',
	token_type: 'Bearer'
};

var access_token = tokens.access_token;

var string = 'user=info@pocument.com^Aauth=Bearer ' + access_token + '^A^A';


var baseString = new Buffer(string, 'base64').toString();


exports.connect = function() {
	console.log(string);
	console.log(baseString);
	var imap = new Imap({
		host: 'imap.gmail.com',
		port: '993',
		secure: true,
		debug: true,
		xoauth2: baseString
	});

	imap.connect(function(err) {
		if (err) {
			console.error(err);
		} else {
			console.log('Successfully connected to Gmail');
			imap.logout();
		}
	});
};


