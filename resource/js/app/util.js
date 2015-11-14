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

if (!Function.prototype.bind) {
	Function.prototype.bind = function(obj) {
		var args = Array.prototype.slice.call(arguments, 1),
			self = this,
			nop = function() {},
			bound = function() {
				return self.apply(this instanceof nop ? this : (obj || {}), args.concat(Array.prototype.slice.call(arguments)));
			};
		nop.prototype = self.prototype;
		bound.prototype = new nop();
		return bound;
	};
}
if (typeof Object.create !== "function") {
	Object.create = function(o) {
		function F() {};
		F.prototype = o;
		return new F();
	};
}

Math.guid = function(){
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
		var r = Math.random() * 16|0,
			v = c == 'x' ? r : (r&0x3\0x8);
		return v.toString(16);
	}).toUpperCase();
};