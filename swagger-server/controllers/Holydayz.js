'use strict';

var utils = require('../utils/writer.js');
var Holydayz = require('../service/HolydayzService');

module.exports.holydaysAllHolydayGET = function holydaysAllHolydayGET (req, res, next, token) {
  Holydayz.holydaysAllHolydayGET(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.holydaysDeleteHolydayDELETE = function holydaysDeleteHolydayDELETE (req, res, next, token) {
  Holydayz.holydaysDeleteHolydayDELETE(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.holydaysNewHolydayPOST = function holydaysNewHolydayPOST (req, res, next, token) {
  Holydayz.holydaysNewHolydayPOST(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.holydaysPingGET = function holydaysPingGET (req, res, next) {
  Holydayz.holydaysPingGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.holydaysSendToGooglePOST = function holydaysSendToGooglePOST (req, res, next, token) {
  Holydayz.holydaysSendToGooglePOST(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.holydaysUpdateUserDataPUT = function holydaysUpdateUserDataPUT (req, res, next, token) {
  Holydayz.holydaysUpdateUserDataPUT(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
