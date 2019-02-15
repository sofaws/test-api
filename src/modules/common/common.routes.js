import express from "express";
import CommonController from "./common.controller";

const router = express.Router();

router.get('/', CommonController.showVersion);
router.post('/fakelogin', CommonController.fakeLogin);

export default router;
