"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _index = _interopRequireDefault(require("../../index"));

var _routes = require("../../routes");

var _package = require("../../../package");

_chai.default.use(require('chai-http'));

describe('Commons', function () {
  describe('/GET /', function () {
    it('it should GET the api version', function (done) {
      _chai.default.request(_index.default).get(_routes.PREFIXS_ROUTE_NAME.BASE).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.version).to.equal(_package.version);
        done();
      });
    });
  });
});