define(function() {
	return {
		inherited: function() {
			console.log("inherited");
		},
		created: function() {
			console.log("created");
		},
		prototype: {
			newRecord: true,
			init: function() {
				console.log("init");
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
				this.parent.records[this.id] = this;
			},
			save: function(id) {
				this.newRecord ? this.create() : this.update();
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
			return this.records[id] || null;
		}
	}
});