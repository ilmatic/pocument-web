define([
	
],

function() {
	return function(opts) {
		opts = opts || {};
		this.name = opts.name || 'Fuji';
		this.sound = opts.sound || 'crunch';
	};
});
