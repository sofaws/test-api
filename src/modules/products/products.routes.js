import express from "express";
import ProductController from "./products.controller";

const router = express.Router();

/**
 * Example to add middleware before crud routes
 */
const crudMiddleware = {
    findAll: (req, res, next) => {
        console.log("test findAll middleware");
        next();
    }
};


const controller = new ProductController(router, crudMiddleware);

export default router;
