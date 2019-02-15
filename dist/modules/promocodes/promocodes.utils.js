"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestIsValid = requestIsValid;
exports.isValidRestrictionsFormat = isValidRestrictionsFormat;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _promocodes = require("./promocodes.services");

var _asyncAf = _interopRequireDefault(require("async-af"));

/**
 * Constant that contains the different keys of possible restrictions.
 * The goal is to try to have a generic algorithm to add more easily
 */
var TYPE_RESTRICTIONS = {
  'or': function () {
    var _or = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(restrictions, params) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return orIsValidate(restrictions, params);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function or(_x, _x2) {
      return _or.apply(this, arguments);
    }

    return or;
  }(),
  'and': function () {
    var _and = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(restrictions, params) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return restrictionsIsValid(restrictions, params);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function and(_x3, _x4) {
      return _and.apply(this, arguments);
    }

    return and;
  }(),
  'age': function age(restrictions, params) {
    return ageValidator(params.age, restrictions);
  },
  'date': function date(restrictions, params) {
    return dateValidator(new Date(), restrictions);
  },
  'meteo': function () {
    var _meteo = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(restrictions, params) {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return meteoValidator(restrictions, params);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function meteo(_x5, _x6) {
      return _meteo.apply(this, arguments);
    }

    return meteo;
  }()
};
/**
 * Check if the params of request are valid (compare with restrictions of promocode)
 * @param restrictions
 * @param params
 * @returns {Promise<Array>}
 */

function requestIsValid(_x7, _x8) {
  return _requestIsValid.apply(this, arguments);
}
/**
 * Check if params match ALL's restrictions or AND's restrictions
 * @param restrictions
 * @param params
 * @returns {Promise<Array>}
 */


function _requestIsValid() {
  _requestIsValid = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(restrictions, params) {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return restrictionsIsValid(restrictions, params);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _requestIsValid.apply(this, arguments);
}

function restrictionsIsValid(_x9, _x10) {
  return _restrictionsIsValid.apply(this, arguments);
}
/**
 * Check if params match OR's restrictions
 * @param restrictions
 * @param params
 * @returns {Promise<boolean>}
 */


function _restrictionsIsValid() {
  _restrictionsIsValid = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(restrictions, params) {
    var errors;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            errors = [];
            _context6.next = 3;
            return (0, _asyncAf.default)(restrictions).forEach(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee5(field) {
                var value;
                return _regenerator.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);

                      case 2:
                        value = _context5.sent;
                        if (!value) errors.push({
                          type: field.restriction_name,
                          restrictions: field.restrictions
                        });

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              }));

              return function (_x15) {
                return _ref.apply(this, arguments);
              };
            }());

          case 3:
            return _context6.abrupt("return", errors);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _restrictionsIsValid.apply(this, arguments);
}

function orIsValidate(_x11, _x12) {
  return _orIsValidate.apply(this, arguments);
}
/**
 * Check if params match age's restrictions
 * @param age
 * @param restriction
 * @returns {boolean}
 */


function _orIsValidate() {
  _orIsValidate = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee8(restrictions, params) {
    var isValid;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            isValid = false;
            _context8.next = 3;
            return (0, _asyncAf.default)(restrictions).forEach(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee7(field) {
                var valid;
                return _regenerator.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);

                      case 2:
                        valid = _context7.sent;

                        if (valid) {
                          isValid = true;
                        }

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, this);
              }));

              return function (_x16) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
            return _context8.abrupt("return", isValid);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _orIsValidate.apply(this, arguments);
}

function ageValidator(age, restriction) {
  if (restriction.eq) {
    return age === restriction.eq;
  } else {
    return age >= restriction.gt && age <= restriction.lt;
  }
}
/**
 * Check if params match date's restrictions
 * @param date
 * @param restriction
 * @returns {boolean}
 */


function dateValidator(date, restriction) {
  var now = date.getTime();
  var before = new Date(restriction.before).getTime();
  var after = new Date(restriction.after).getTime();
  return now >= after && now <= before;
}
/**
 * Check if params match meteo's restrictions
 * @param restrictions
 * @param params
 * @returns {Promise<boolean>}
 */


function meteoValidator(_x13, _x14) {
  return _meteoValidator.apply(this, arguments);
}
/**
 * Detect invalid keys in restriction array
 * @param restrictions
 * @returns {Array}
 */


function _meteoValidator() {
  _meteoValidator = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee9(restrictions, params) {
    var _ref3, weather, temp, tempIsValid, weatherIsValid;

    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!(!params.city || !restrictions.temp)) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt("return", false);

          case 2:
            _context9.next = 4;
            return (0, _promocodes.getWeather)(params.city);

          case 4:
            _ref3 = _context9.sent;
            weather = _ref3.weather;
            temp = _ref3.main.temp;
            tempIsValid = restrictions.temp.eq ? temp === restrictions.temp.eq : temp >= restrictions.temp.eq || temp <= restrictions.temp.lt;
            weatherIsValid = weather[0].main.toUpperCase() === restrictions.is.toUpperCase();
            return _context9.abrupt("return", tempIsValid && weatherIsValid);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _meteoValidator.apply(this, arguments);
}

function isValidRestrictionsFormat(restrictions) {
  var errors = [];
  restrictions.forEach(function (field) {
    if (!Object.keys(TYPE_RESTRICTIONS).includes(field.restriction_name)) {
      errors.push({
        field: field.restriction_name,
        message: 'this type doesn\'t exist'
      });
    }

    if (Array.isArray(field.restrictions)) errors = [].concat((0, _toConsumableArray2.default)(errors), (0, _toConsumableArray2.default)(isValidRestrictionsFormat(field.restrictions)));
  });
  return errors;
}