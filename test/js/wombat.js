define([

],

function() {
	var Wombat = function(opts) {
		opts = opts || {};
		this.name = opts.name || 'Wally';
	}

	Wombat.prototype = {
		eat: function(food) {
			if (!food) throw Error('D:');

			return 'nom nom';
		}
	};

	return Wombat;
});
