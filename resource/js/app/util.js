define(function() {
	return {
		assert: function(value, msg) {
			if (!value) {
				throw (msg || (value + " dose not equal true"));
			}
		},
		assertEqual: function(val1, val2, msg) {
			if (val1 != val2) {
				throw (msg || (val1 + " dose not equal " + val2));
			}
		}
	}
});