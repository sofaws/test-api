"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuth;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = require("../constants/response.constant");

function isAuth(req, res, next) {
  var header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    var bearer = header.split(' ');
    var token = bearer[1];

    _jsonwebtoken.default.verify(token, 'fakeprivatekeyputtoenv', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
        res.status(403).send((0, _response.ErrorResponse)('Token isnot valid'));
      } else {
        next();
      }
    });
  } else {
    res.status(403).send((0, _response.ErrorResponse)('no token'));
  }
}