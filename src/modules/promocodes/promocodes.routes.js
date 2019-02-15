import express from "express";
import PromoCodeController from "./promocodes.controller";

const router = express.Router();


router.post('/', PromoCodeController.create);
router.post('/ask', PromoCodeController.ask);

export default router;
