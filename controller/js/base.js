var assert = function(value, msg){
	if(!value){
		throw(msg || (value + " dose not equal true"));
	}
};
var assertEqual = function(val1, val2, msg){
	if(val1 != valu2){
		throw(msg || (val1 + " dose not equal " + val2));
	}
};