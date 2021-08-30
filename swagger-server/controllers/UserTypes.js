'use strict';

var utils = require('../utils/writer.js');
var UserTypes = require('../service/UserTypesService');

module.exports.userTypeDeleteUserTypeDELETE = function userTypeDeleteUserTypeDELETE (req, res, next, token) {
  UserTypes.userTypeDeleteUserTypeDELETE(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTypeNewUserTypePOST = function userTypeNewUserTypePOST (req, res, next, token) {
  UserTypes.userTypeNewUserTypePOST(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTypePingGET = function userTypePingGET (req, res, next) {
  UserTypes.userTypePingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userTypeUpdateUserTypesPUT = function userTypeUpdateUserTypesPUT (req, res, next, token) {
  UserTypes.userTypeUpdateUserTypesPUT(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usertypesAlluserTypesGET = function usertypesAlluserTypesGET (req, res, next, token) {
  UserTypes.usertypesAlluserTypesGET(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
