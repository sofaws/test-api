"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatQuery = formatQuery;

var _lodash = _interopRequireDefault(require("lodash"));

/**
 * Check if the filters exist in collection and get limit and offset pass to parameters
 * @param collection
 * @param query
 * @param limitDefault
 * @returns {{filter: {}, limit: (Number|number), offset: (Number|number)}}
 */
function formatQuery(collection, query) {
  var limitDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var filter = {};
  var limit = parseInt(query.limit, 10) || limitDefault;
  var page = parseInt(query.page, 10) || 1;
  var offset = page * limit - limit;

  _lodash.default.forEach(query, function (value, key) {
    if (collection.schema.tree[key]) filter[key] = value;
  });

  return {
    filter: filter,
    limit: limit,
    offset: offset
  };
}