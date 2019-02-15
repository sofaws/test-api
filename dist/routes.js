"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTES_MODULES = exports.PREFIXS_ROUTE_NAME = void 0;

var _common = _interopRequireDefault(require("./modules/common"));

var _promocodes = _interopRequireDefault(require("./modules/promocodes"));

var PREFIXS_ROUTE_NAME = {
  BASE: '/',
  PROMOCODES: '/promocodes'
};
exports.PREFIXS_ROUTE_NAME = PREFIXS_ROUTE_NAME;
var ROUTES_MODULES = [{
  prefix: PREFIXS_ROUTE_NAME.BASE,
  target: _common.default.Routes
}, {
  prefix: PREFIXS_ROUTE_NAME.PROMOCODES,
  target: _promocodes.default.Routes
}];
exports.ROUTES_MODULES = ROUTES_MODULES;