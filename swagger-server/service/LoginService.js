'use strict';


/**
 * simple answer to a simple query
 * check the server and the route
 *
 * returns String
 **/
exports.loginPingGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "pong";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * verify the google code.
 * verify the openID code.
 *
 * returns #/definitions/UserHolyday
 **/
exports.usersSendLoginCodeGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "{}";
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
 * returns inline_response_201
 **/
exports.usersUpdateUserDataPUT = function(token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "nickName" : "Kandisz Nóra"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

