"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessResponse = exports.ErrorResponse = void 0;

var ErrorResponse = function ErrorResponse(err) {
  return {
    success: false,
    err: err
  };
};

exports.ErrorResponse = ErrorResponse;

var SuccessResponse = function SuccessResponse(data) {
  return {
    success: true,
    data: data
  };
};

exports.SuccessResponse = SuccessResponse;