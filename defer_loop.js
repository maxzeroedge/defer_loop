/**
 * obj_array: Array of objects
 * idx_array: Array of indices of object to execute on. Remove first element on each run
 * callup: function to run on each object. Must return a promise!!
 * defer: defer to resolve on calling function on final object
 * ret_array: Array containing results of each iteration
 */
 var deferLoop = function(attrs){
	var obj_array, idx_array, callup, defer, ret_array;
	defer = attrs.defer ? attrs.defer : $.Deferred();
	obj_array = attrs.obj_array;
	idx_array = attrs.idx_array;
	var tempLen = idx_array.length;
	callback = attrs.callup;
	ret_array = attrs.ret_array ? attrs.ret_array : [];
	var idx = idx_array.shift();
	if(tempLen == idx_array.length){console.error("Something is wrong!" + tempLen);}
	if(idx){
		$.when(callup(obj_array[idx])).done(function(d){
			ret_array.push(d);
			deferLoop({
				'obj_array': obj_array, 
				'idx_array': idx_array,
				'callup': callup,
				'defer': defer,
				'ret_array': ret_array 
			});
		});
	} else{
		defer.resolve(ret_array);
	}
	return defer.promise();
}
