
/**
* Returns a memoized version of a function, that's a function endowed with a cache.
*/
function memoize(fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments) ;//get the array of arguments passed to fn
        fn.cache = fn.cache || {} ; //if fn has cache, use it, otherwise create one
        return fn.cache[args] ? fn.cache[args] : (fn.cache[args] = fn.apply(this,args)) ; //if fn has cached result for args, return those, otherwise apply fn to the args and save the result to the cache
    }
}

/**
* Exemple of use of memoize function
*/
//create any function
function fn(input) { return 2*input; };
//create a memoized version of fn
var mfn = memoize(fn);
//use this memoized version
mfn(2); //return 4 and caches the key-value pair {2 : 4}
//take a peek at fn's cache
fn.cache; // { 2 : 4 }
//if you directly use fn it will not cache
fn(3); // returns 6 but does not cache
fn.cache; // still is { 2 : 4 }
