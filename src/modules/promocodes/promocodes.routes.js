import express from "express";
import isAuth from '../../middlewares/auth.middleware'
import PromoCodeController from "./promocodes.controller";

const router = express.Router();


router.post('/', isAuth, PromoCodeController.create);
router.post('/request', PromoCodeController.request);

export default router;
