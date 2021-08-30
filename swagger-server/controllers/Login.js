'use strict';

var utils = require('../utils/writer.js');
var Login = require('../service/LoginService');

module.exports.loginPingGET = function loginPingGET (req, res, next) {
  Login.loginPingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersSendLoginCodeGET = function usersSendLoginCodeGET (req, res, next) {
  Login.usersSendLoginCodeGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUpdateUserDataPUT = function usersUpdateUserDataPUT (req, res, next, token) {
  Login.usersUpdateUserDataPUT(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
