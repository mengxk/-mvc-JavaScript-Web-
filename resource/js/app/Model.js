define(function() {
	return {
		inherited: function() {
			//console.log("inherited");
		},
		created: function() {
			this.records = {};
			this.attributes = [];
		},
		prototype: {
			newRecord: true,
			init: function(o) {
				for (var attr in o) {
					this[attr] = o[attr];
				}
			},
			create: function() {
				this.newRecord = false;
				if (!this.id) {
					this.id = Math.guid();
				}
				this.update();
			},
			destory: function() {
				delete this.parent.records[this.id];
			},
			update: function() {
				this.parent.records[this.id] = this.dup();
			},
			save: function(id) {
				this.newRecord ? this.create() : this.update();
			},
			dup: function() {
				return jQuery.extend(true, {}, this);
			},
			attributes: function() {
				var result = {};
				for (var i in this.parent.attributes) {
					var attr = this.parent.attributes[i];
					result[attr] = this[attr];
				}
				result.id = this.id;
				return result;
			},
			toJSON: function() {
				return (this.attributes());
			}
		},
		create: function() {
			var object = Object.create(this);
			object.parent = this;
			object.prototype = object.fn = Object.create(this.prototype);
			object.created();
			this.inherited(object);
			return object;
		},
		init: function() {
			var instance = Object.create(this.prototype);
			instance.parent = this;
			instance.init.apply(instance, arguments);
			return instance;
		},
		extend: function(o) {
			var extended = o.extended;
			jQuery.extend(this, o);
			if (extended)
				extended(this);
		},
		include: function(o) {
			var included = o.included;
			jQuery.extend(this.prototype, o);
			if (included)
				included(this);
		},
		find: function(id) {
			var record = this.records[id];
			if (!record) throw ("Unknown record");
			return record.dup();
		},
		populate: function(values) {
			//重置model和records
			this.records = {};
			for (var i = 0, il = values.length; i < il; i++) {
				var record = this.init(values[i]);
				record.newRecord = false;
				this.records[record.id] = record;
			}
		},
		saveLocal: function(name) {
			localStorage.removeItem(name);
			//将记录转换为数组
			var result = [];
			for (var i in this.records) {
				result.push(this.records[i]);
			}
			localStorage[name] = JSON.stringify(result);
		},
		loadLocal: function(name) {
			if(localStorage[name]){
				var result = JSON.parse(localStorage[name]);
				this.populate(result);	
			}
		}
	}
});