"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotValidAskResponse = exports.ValidAskResponse = void 0;

var ValidAskResponse = function ValidAskResponse(promocode, avantage) {
  return {
    promocode_name: promocode,
    status: "accepted",
    avantage: avantage
  };
};

exports.ValidAskResponse = ValidAskResponse;

var NotValidAskResponse = function NotValidAskResponse(promocode, reasons) {
  return {
    promocode_name: promocode,
    status: "denied",
    reasons: reasons
  };
};

exports.NotValidAskResponse = NotValidAskResponse;