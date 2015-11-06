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
		},
		Class: function(parent) {
			var klass = function() {
				this.init.apply(this, arguments);
			};

			//改变klass的原型
			if (parent) {
				var subclass = function() {};
				subclass.prototype = parent.prototype;
				klass.prototype = new subclass();
			};

			klass.prototype.init = function() {
				console.log("klass init");
			};

			//定义别名
			klass.fn = klass.prototype;
			klass.fn.parent = klass;
			klass._super = klass._proto_;
			//给类添加属性
			klass.extend = function(obj) {
				var extended = obj.extended;
				for (var i in obj) {
					klass[i] = obj[i];
				}
				if (extended)
					extended(klass);
			};
			//给实例添加属性
			klass.include = function(obj) {
				var included = obj.included;
				for (var i in obj) {
					klass.fn[i] = obj[i];
				}
				if (included)
					inclueded(klass);
			};
			//添加一个proxy函数
			klass.proxy = function(func){
				var self = this;
				return (function(){
					return func.apply(self, arguments);
				});
			};
			//在实例中也添加
			klass.fn.proxy = klass.proxy;

			return klass;
		}
	}
});

if(!Function.prototype.bind){
	Function.prototype.bind = function(obj){
		debugger;
		var args = Array.prototype.slice.call(arguments, 1),
			self = this,
			nop = function(){},
			bound = function(){
				return self.apply(this instanceof nop ? this : (obj || {}), args.concat(Array.prototype.slice.call(arguments)));
			};
		nop.prototype = self.prototype;
		bound.prototype = new nop();
		return bound;
	};
}