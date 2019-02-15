"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _index = _interopRequireDefault(require("../../index"));

var _routes = require("../../routes");

_chai.default.use(require('chai-http'));

describe('Products', function () {
  describe('/create promocodes', function () {
    it('it should decline the request because restrictions array is not valid', function (done) {
      var request = {
        "name": "WeatherCode",
        "avantage": {
          "percent": 20
        },
        "restrictions": [{
          "restriction_name": "or",
          "restrictions": [{
            "restriction_name": "ddeate",
            "restrictions": {
              "after": "2017-05-02",
              "before": "2020-05-02"
            }
          }, {
            "restriction_name": "age",
            "restrictions": {
              "eq": 40
            }
          }, {
            "restriction_name": "age",
            "restrictions": {
              "lt": 30,
              "gt": 15
            }
          }]
        }, {
          "restriction_name": "date",
          "restrictions": {
            "after": "2017-05-02",
            "before": "2020-05-02"
          }
        }]
      };

      _chai.default.request(_index.default).post("".concat(_routes.PREFIXS_ROUTE_NAME.PROMOCODES)).send(request).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(422);
        done();
      });
    });
  });
  describe('/create promocodes', function () {
    it('it should create a codepromo', function (done) {
      var request = {
        "name": "WeatherCodeTest",
        "avantage": {
          "percent": 20
        },
        "restrictions": [{
          "restriction_name": "or",
          "restrictions": [{
            "restriction_name": "age",
            "restrictions": {
              "eq": 40
            }
          }, {
            "restriction_name": "age",
            "restrictions": {
              "lt": 30,
              "gt": 15
            }
          }]
        }, {
          "restriction_name": "date",
          "restrictions": {
            "after": "2017-05-02",
            "before": "2020-05-02"
          }
        }]
      };

      _chai.default.request(_index.default).post("".concat(_routes.PREFIXS_ROUTE_NAME.PROMOCODES)).send(request).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('/request promocodes', function () {
    it('it should decline the request because promocode_name dont exist', function (done) {
      var request = {
        "promocode_name": "WeatherCode",
        "params": {
          "age": 41,
          "city": "Paris"
        }
      };

      _chai.default.request(_index.default).post("".concat(_routes.PREFIXS_ROUTE_NAME.PROMOCODES, "/request")).send(request).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        done();
      });
    });
    it('it should decline the request because age not match', function (done) {
      var request = {
        "promocode_name": "WeatherCodeTest",
        "params": {
          "age": 41,
          "city": "Paris"
        }
      };

      _chai.default.request(_index.default).post("".concat(_routes.PREFIXS_ROUTE_NAME.PROMOCODES, "/request")).send(request).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(403);
        (0, _chai.expect)(res.body.status).to.equal('denied');
        (0, _chai.expect)(res.body.reasons[0].type).to.equal('or');
        done();
      });
    });
    it('it should accept the request', function (done) {
      var request = {
        "promocode_name": "WeatherCodeTest",
        "params": {
          "age": 40,
          "city": "Paris"
        }
      };

      _chai.default.request(_index.default).post("".concat(_routes.PREFIXS_ROUTE_NAME.PROMOCODES, "/request")).send(request).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('accepted');
        (0, _chai.expect)(res.body.avantage.percent).to.equal(20);
        done();
      });
    });
  });
});