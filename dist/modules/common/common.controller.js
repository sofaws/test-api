"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _package = require("../../../package");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var CommonController =
/*#__PURE__*/
function () {
  function CommonController() {
    (0, _classCallCheck2.default)(this, CommonController);
  }

  (0, _createClass2.default)(CommonController, null, [{
    key: "showVersion",
    value: function showVersion(req, res) {
      res.json({
        version: _package.version
      });
    }
  }, {
    key: "fakeLogin",
    value: function fakeLogin(req, res) {
      _jsonwebtoken.default.sign({
        usernamefake: "TEST"
      }, 'fakeprivatekeyputtoenv', {
        expiresIn: '1h'
      }, function (err, token) {
        if (err) {
          console.log(err);
        }

        res.send(token);
      });
    }
  }]);
  return CommonController;
}();

exports.default = CommonController;