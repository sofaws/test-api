"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var AvantageSchema = new _mongoose.Schema({
  percent: {
    type: Number,
    required: true
  }
});
var PromoCodeSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  avantage: {
    type: AvantageSchema,
    required: true
  },
  restrictions: {}
});

var PromoCodeModel = _mongoose.default.model('PromoCode', PromoCodeSchema);

var _default = PromoCodeModel;
exports.default = _default;