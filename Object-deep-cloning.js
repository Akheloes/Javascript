/**
  A function which controls whether an input is an actual object or not.
  If feed null or undefined, returns false.
 */
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

/**
  A function which returns a deep copy of an object. It recursively calls itself when a property of the copied object is
  an object, then goes through this object in a similar fashion.
 */
function recursiveDeepCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      // if the value is a nested object, recursively copy all it's properties
      if (isObject(src[prop])) {
        target[prop] = iterationCopy(src[prop]);
      } else {
      // Otherwise, simply create the cloned object
        target[prop] = src[prop];
      }
    }
  }
  return target;
}

/**
  For an ES6 syntax, a cheat-use of an available function. 
 */
function deepCopy(src) {
  return Object.assign({}, src);
}
