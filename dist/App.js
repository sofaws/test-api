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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = require("./database");

var _combine_middleware = _interopRequireDefault(require("./utils/combine_middleware.utils"));

/**
 * List of middleware that will be launched at project launch.
 * @type {function[]}
 */
var MIDDLEWARES = [(0, _cors.default)(), process.env.NODE_ENV !== "test" ? (0, _morgan.default)('combined') : null, _bodyParser.default.json(), _bodyParser.default.urlencoded({
  extended: false
})].filter(Boolean);
/**
 * This class is used to initialize the express application
 */

var App =
/*#__PURE__*/
function () {
  function App() {
    (0, _classCallCheck2.default)(this, App);
    (0, _defineProperty2.default)(this, "setupBDD",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var database;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(process.env.NODE_ENV === "test")) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return (0, _database.mockMongoose)();

            case 3:
              _context.t0 = _context.sent;
              _context.next = 7;
              break;

            case 6:
              _context.t0 = (0, _database.getMongoose)();

            case 7:
              database = _context.t0;
              database.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
              database.once('open', function () {
                console.log("Connexion à la base OK");
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    this.express = (0, _express.default)();
    this.setupMiddlewares();
    this.setupBDD();
    this.setupRoutes();
  }
  /**
   * Connect to the database
   * @param callback
   */


  (0, _createClass2.default)(App, [{
    key: "setupMiddlewares",

    /**
     * Call the different middlewares defined in the constant MIDDLEWARES
     */
    value: function setupMiddlewares() {
      this.express.use((0, _combine_middleware.default)(MIDDLEWARES));
    }
    /**
     * setup the routes defined in the routes.js file
     */

  }, {
    key: "setupRoutes",
    value: function setupRoutes() {
      var _this = this;

      _routes.ROUTES_MODULES.forEach(function (route) {
        return _this.express.use(route.prefix, route.target);
      });
    }
  }]);
  return App;
}();

var _default = new App().express;
exports.default = _default;