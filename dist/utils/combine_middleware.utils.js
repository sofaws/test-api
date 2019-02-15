"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineMiddlewares;

function combineMiddlewares(middleware) {
  return middleware.reduce(function (a, b) {
    return function (req, res, next) {
      a(req, res, function (err) {
        if (err) {
          return next(err);
        }

        b(req, res, next);
      });
    };
  });
}