define(function(){
	return function(){
		var klass = function(parent) {
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
			klass.proxy = function(func) {
				var self = this;
				return (function() {
					return func.apply(self, arguments);
				});
			};
			//在实例中也添加
			klass.fn.proxy = klass.proxy;

			return klass;
	};
});