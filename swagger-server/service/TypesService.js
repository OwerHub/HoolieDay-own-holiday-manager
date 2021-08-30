'use strict';


/**
 * post new holyday.
 * post new holyday
 *
 * token String  (optional)
 * returns List
 **/
exports.typesAlltypesGET = function(token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{}", "{}" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * post new holyday.
 * post new holyday
 *
 * token String  (optional)
 * returns List
 **/
exports.typesNewTypePOST = function(token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{}", "{}" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

