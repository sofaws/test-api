import express from "express";
import CommonController from "./common.controller";

const router = express.Router();

router.get('/', CommonController.showVersion);

export default router;
