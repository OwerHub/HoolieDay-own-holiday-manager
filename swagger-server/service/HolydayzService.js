'use strict';


/**
 * get all holyday.
 * get all holyday from the user
 *
 * token String  (optional)
 * returns List
 **/
exports.holydaysAllHolydayGET = function(token) {
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
 * change a holydays value
 *
 * token String  (optional)
 * returns List
 **/
exports.holydaysDeleteHolydayDELETE = function(token) {
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
exports.holydaysNewHolydayPOST = function(token) {
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


/**
 * simple answer to a simple query
 * check the server and the route
 *
 * returns String
 **/
exports.holydaysPingGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * send holyday to Google.
 * post new holyday
 *
 * token String  (optional)
 * returns inline_response_200
 **/
exports.holydaysSendToGooglePOST = function(token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Holyday's Saved"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * change a holydays value
 *
 * token String  (optional)
 * returns List
 **/
exports.holydaysUpdateUserDataPUT = function(token) {
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

