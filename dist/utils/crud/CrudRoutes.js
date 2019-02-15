"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCrudRoutes = void 0;

/**
 * Lets put all the roads of a crud for a controller that inherits from CrudController
 * @param router
 * @param middleware
 *   eg.
 *   {
 *       find: (req, res, next) => {...}
 *       findAll: (req, res, next) => {...}
 *       delete: (req, res, next) => {...}
 *       update: (req, res, next) => {...}
 *       create: (req, res, next) => {...}
 *   }
 *   All attributes may be null.
 * @param controller
 */
var setCrudRoutes = function setCrudRoutes(router, middleware, controller) {
  router.get('/:id', middleware.find || pass, controller.find);
  router.put('/:id', middleware.update || pass, controller.update);
  router.delete('/:id', middleware.delete || pass, controller.delete);
  router.get('/', middleware.findAll || pass, controller.findAll);
  router.post('/', middleware.create || pass, controller.create);
};

exports.setCrudRoutes = setCrudRoutes;

var pass = function pass(req, res, next) {
  return next();
};