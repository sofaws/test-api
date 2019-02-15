"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _promocodes = _interopRequireDefault(require("./promocodes.model"));

var _response = require("../../constants/response.constant");

var _promocodes2 = require("./promocodes.utils");

var _promocodes3 = require("./promocodes.constants");

var PromoCodeController =
/*#__PURE__*/
function () {
  function PromoCodeController() {
    (0, _classCallCheck2.default)(this, PromoCodeController);
  }

  (0, _createClass2.default)(PromoCodeController, null, [{
    key: "create",

    /**
     * Create a document of PromoCode
     * @param req
     * @param res
     */
    value: function create(req, res) {
      var errors = (0, _promocodes2.isValidRestrictionsFormat)(req.body.restrictions);
      if (errors.length) return res.status(422).send((0, _response.ErrorResponse)(errors));

      _promocodes.default.create(req.body).then(function (data) {
        return res.status(200).send((0, _response.SuccessResponse)(data));
      }).catch(function (err) {
        if (err.name === 'ValidationError') {
          res.status(422).send((0, _response.ErrorResponse)(err));
        } else {
          res.status(500).send((0, _response.ErrorResponse)(err));
        }
      });
    }
  }, {
    key: "request",
    value: function request(req, res) {
      var promoCode = req.body.promocode_name;
      var params = req.body.params;
      if (!promoCode) res.status(404).send((0, _response.ErrorResponse)('promocode_name params is required'));

      _promocodes.default.findOne({
        name: promoCode
      }).then(
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(data) {
          var errors;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (data) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return", res.status(404).send((0, _response.ErrorResponse)('Promocode not found')));

                case 2:
                  _context.next = 4;
                  return (0, _promocodes2.requestIsValid)(data.restrictions, params);

                case 4:
                  errors = _context.sent;

                  if (errors.length === 0) {
                    res.status(200).send((0, _promocodes3.ValidAskResponse)(promoCode, data.avantage));
                  } else {
                    res.status(403).send((0, _promocodes3.NotValidAskResponse)(promoCode, errors));
                  }

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()).catch(function (err) {
        return res.status(500).send((0, _response.ErrorResponse)(err));
      });
    }
  }]);
  return PromoCodeController;
}();

exports.default = PromoCodeController;