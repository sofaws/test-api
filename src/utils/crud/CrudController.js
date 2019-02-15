import {ErrorResponse, SuccessResponse} from "../../constants/response.constant";
import {setCrudRoutes} from "./CrudRoutes";
import {formatQuery} from "../request.utils";

export default (Model) => {
    return class CrudController {

        constructor(router, middleware = {}) {
            if(router) {
                setCrudRoutes(router, middleware, this);
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
        findAll(req, res) {
            const { filter, limit, offset } = formatQuery(Model, req.query, 100);
            Model.find(filter, null, { limit, skip: offset })
                .then(data => res.status(200).send(SuccessResponse(data)))
                .catch(err => res.status(500).send(ErrorResponse(err)))
        }

        /**
         * Find one document of Model according to id
         * @param req
         * @param res
         */
        find(req, res) {
            Model.findById(req.params.id)
                .then(data => {
                    if (!data) return res.status(404).send(ErrorResponse('Entity not found'));
                    res.status(200).send(SuccessResponse(data));
                })
                .catch(err => res.status(500).send(ErrorResponse(err)));
        }

        /**
         * Create a document of Model
         * @param req
         * @param res
         */
        create(req, res) {
            Model.create(req.body)
                .then(data => res.status(200).send(SuccessResponse(data)))
                .catch((err) => {
                    if (err.name === 'ValidationError') {
                        res.status(422).send(ErrorResponse(err));
                    } else {
                        res.status(500).send(ErrorResponse(err));
                    }
                });
        };

        /**
         * Update a documpent of Model
         * @param req
         * @param res
         */
        update(req, res) {
            Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
                .then(data => {
                    if (!data) return res.status(404).send(ErrorResponse('Entity not found'));
                    res.status(200).send(SuccessResponse(data));
                })
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        res.status(422).send(ErrorResponse(err));
                    } else {
                        res.status(500).send(ErrorResponse(err));
                    }
                })
        }

        /**
         * Delete a document of Model
         * @param req
         * @param res
         */
        delete(req, res) {
           Model.findByIdAndRemove(req.params.id)
               .then(data => {
                   if (!data) return res.status(404).send(ErrorResponse('Entity not found'));
                   res.status(200).send(SuccessResponse(data));
               })
               .catch(err => res.status(500).send(ErrorResponse(err)))
        }
    };
}
