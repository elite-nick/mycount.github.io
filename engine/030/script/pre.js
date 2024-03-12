function rjsl_prop(){
	return this;
}

rjsl_prop.prototype.last_ref = -1;
rjsl_prop.prototype.av = 0;
rjsl_prop.prototype.get = function(){return this.av};
rjsl_prop.prototype.setF = function(v){this.av = v};
rjsl_prop.prototype.set = function(v){this.setF(v)};
rjsl_prop.prototype.ref = function(){};
rjsl_prop.prototype.preRef = function(){};

var prAr = {
	props : new Array(),
	_t_array : new Array(),
	add : function(name, get, set, ref, preRef){
		var ni = new rjsl_prop();
		if (get) ni.get = get;
		if (set) ni.setF = set;
		if (ref) ni.ref = ref;
		if (preRef) ni.preRef = preRef;
		prAr.props[name] = ni;
	},
	get : function(n){
		return prAr.props[n].get();
	},
	set : function(n, v){
		if (prAr.get(n) != v){
			prAr.props[n].set(v);
			prAr.touch(n);
		}
	},
	end : function(){
		for(var ppp in prAr._t_array){
			var pr = prAr.props[ppp];
			if (pr) pr.preRef();
		}
		for(var ppp in prAr._t_array){
			var pr = prAr.props[ppp];
			if (pr) pr.ref();
		}
		prAr._t_array = new Array();
		
		return false;
	},
	eset : function(n, v){
		prAr.set(n, v);
		return prAr.end();
	},
	touch : function(n){
		prAr._t_array[n] = 1;
	}
}