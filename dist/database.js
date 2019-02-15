"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMongoose = getMongoose;
exports.mockMongoose = mockMongoose;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodbMemoryServer = _interopRequireDefault(require("mongodb-memory-server"));

require('dotenv').config();

var urlmongo = "mongodb://".concat(process.env.DATABASE_USER, ":").concat(process.env.DATABASE_PASSWORD, "@").concat(process.env.DATABASE_HOST, ":").concat(process.env.DATABASE_PORT, "/").concat(process.env.DATABASE_NAME);

function getMongoose() {
  _mongoose.default.connect(urlmongo, {
    useNewUrlParser: true
  });

  return _mongoose.default.connection;
}

function mockMongoose() {
  return _mockMongoose.apply(this, arguments);
}

function _mockMongoose() {
  _mockMongoose = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var mongoServer, mongoUri;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongoServer = new _mongodbMemoryServer.default();
            _context.next = 3;
            return mongoServer.getConnectionString();

          case 3:
            mongoUri = _context.sent;

            _mongoose.default.connect(mongoUri, {
              useNewUrlParser: true
            });

            return _context.abrupt("return", _mongoose.default.connection);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _mockMongoose.apply(this, arguments);
}