"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _App = _interopRequireDefault(require("./App"));

var _config = _interopRequireDefault(require("../config.json"));

var port = process.env.PORT || _config.default.port;

_App.default.listen(port, function (err) {
  if (err) {
    return console.log(err);
  }

  return console.log("server is listening on ".concat(port));
});

var _default = _App.default;
exports.default = _default;