'use strict';

var utils = require('../utils/writer.js');
var Types = require('../service/TypesService');

module.exports.typesAlltypesGET = function typesAlltypesGET (req, res, next, token) {
  Types.typesAlltypesGET(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.typesNewTypePOST = function typesNewTypePOST (req, res, next, token) {
  Types.typesNewTypePOST(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
