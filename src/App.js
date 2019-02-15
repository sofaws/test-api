import express from 'express'
import {ROUTES_MODULES} from "./routes";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import {getMongoose, mockMongoose} from "./database";
import combine from './utils/combine_middleware.utils';

/**
 * List of middleware that will be launched at project launch.
 * @type {function[]}
 */
const MIDDLEWARES = [
    cors(),
    process.env.NODE_ENV !== "test" ? morgan('combined') : null,
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: false
    })
].filter(Boolean);

/**
 * This class is used to initialize the express application
 */
class App {
    constructor() {
        this.express = express();
        this.setupMiddlewares();
        this.setupBDD();
        this.setupRoutes();
    }

    /**
     * Connect to the database
     * @param callback
     */
    setupBDD = async () => {
        const database = process.env.NODE_ENV === "test" ? await mockMongoose() : getMongoose();
        database.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
        database.once('open', function () {
            console.log("Connexion à la base OK");
        });
    };

    /**
     * Call the different middlewares defined in the constant MIDDLEWARES
     */
    setupMiddlewares() {
        this.express.use(combine(MIDDLEWARES));
    }

    /**
     * setup the routes defined in the routes.js file
     */
    setupRoutes() {
        ROUTES_MODULES.forEach(route => this.express.use(route.prefix, route.target));
    }
}

export default new App().express
