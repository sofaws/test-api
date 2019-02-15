"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promocodes = _interopRequireDefault(require("./promocodes.controller"));

var _promocodes2 = _interopRequireDefault(require("./promocodes.routes"));

var _promocodes3 = _interopRequireDefault(require("./promocodes.model"));

var _default = {
  Controller: _promocodes.default,
  Routes: _promocodes2.default,
  Model: _promocodes3.default
};
exports.default = _default;