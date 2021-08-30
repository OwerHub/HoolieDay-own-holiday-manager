'use strict';


/**
 * change a holydays value
 *
 * token String  (optional)
 * returns List
 **/
exports.userTypeDeleteUserTypeDELETE = function(token) {
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
 * make a new type in user Document
 *
 * token String  (optional)
 * returns List
 **/
exports.userTypeNewUserTypePOST = function(token) {
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
 * simple answer to a simple query
 * check the server and the route
 *
 * returns String
 **/
exports.userTypePingGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "im a testfunction in UserTypesController";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * change user parameter's value
 *
 * token String  (optional)
 * returns List
 **/
exports.userTypeUpdateUserTypesPUT = function(token) {
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
 * Get all usertype.
 * get all usertype
 *
 * token String  (optional)
 * returns List
 **/
exports.usertypesAlluserTypesGET = function(token) {
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

