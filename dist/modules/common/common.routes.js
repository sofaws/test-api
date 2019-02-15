"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _common = _interopRequireDefault(require("./common.controller"));

var router = _express.default.Router();

router.get('/', _common.default.showVersion);
router.post('/fakelogin', _common.default.fakeLogin);
var _default = router;
exports.default = _default;