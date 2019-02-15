"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../../middlewares/auth.middleware"));

var _promocodes = _interopRequireDefault(require("./promocodes.controller"));

var router = _express.default.Router();

router.post('/', _auth.default, _promocodes.default.create);
router.post('/request', _promocodes.default.request);
var _default = router;
exports.default = _default;