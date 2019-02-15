"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = require("../../constants/response.constant");

var _CrudRoutes = require("./CrudRoutes");

var _request = require("../request.utils");

var _default = function _default(Model) {
  return (
    /*#__PURE__*/
    function () {
      function CrudController(router) {
        var middleware = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck2.default)(this, CrudController);

        if (router) {
          (0, _CrudRoutes.setCrudRoutes)(router, middleware, this);
        }
      }
      /**
       * Find all documents of Model
       * @param req
       * @param res
       *
       * Example params to use :
       * ?page={number}
       * ?limit={number}
       * ?[attributes]=yourvalue
       */


      (0, _createClass2.default)(CrudController, [{
        key: "findAll",
        value: function findAll(req, res) {
          var _formatQuery = (0, _request.formatQuery)(Model, req.query, 100),
              filter = _formatQuery.filter,
              limit = _formatQuery.limit,
              offset = _formatQuery.offset;

          Model.find(filter, null, {
            limit: limit,
            skip: offset
          }).then(function (data) {
            return res.status(200).send((0, _response.SuccessResponse)(data));
          }).catch(function (err) {
            return res.status(500).send((0, _response.ErrorResponse)(err));
          });
        }
        /**
         * Find one document of Model according to id
         * @param req
         * @param res
         */

      }, {
        key: "find",
        value: function find(req, res) {
          Model.findById(req.params.id).then(function (data) {
            if (!data) return res.status(404).send((0, _response.ErrorResponse)('Entity not found'));
            res.status(200).send((0, _response.SuccessResponse)(data));
          }).catch(function (err) {
            return res.status(500).send((0, _response.ErrorResponse)(err));
          });
        }
        /**
         * Create a document of Model
         * @param req
         * @param res
         */

      }, {
        key: "create",
        value: function create(req, res) {
          Model.create(req.body).then(function (data) {
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
        key: "update",

        /**
         * Update a documpent of Model
         * @param req
         * @param res
         */
        value: function update(req, res) {
          Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true
          }).then(function (data) {
            if (!data) return res.status(404).send((0, _response.ErrorResponse)('Entity not found'));
            res.status(200).send((0, _response.SuccessResponse)(data));
          }).catch(function (err) {
            if (err.name === 'ValidationError') {
              res.status(422).send((0, _response.ErrorResponse)(err));
            } else {
              res.status(500).send((0, _response.ErrorResponse)(err));
            }
          });
        }
        /**
         * Delete a document of Model
         * @param req
         * @param res
         */

      }, {
        key: "delete",
        value: function _delete(req, res) {
          Model.findByIdAndRemove(req.params.id).then(function (data) {
            if (!data) return res.status(404).send((0, _response.ErrorResponse)('Entity not found'));
            res.status(200).send((0, _response.SuccessResponse)(data));
          }).catch(function (err) {
            return res.status(500).send((0, _response.ErrorResponse)(err));
          });
        }
      }]);
      return CrudController;
    }()
  );
};

exports.default = _default;