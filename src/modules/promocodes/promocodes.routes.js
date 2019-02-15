import express from "express";
import PromoCodeController from "./promocodes.controller";

const router = express.Router();


router.post('/', PromoCodeController.create);
router.post('/request', PromoCodeController.request);

export default router;
