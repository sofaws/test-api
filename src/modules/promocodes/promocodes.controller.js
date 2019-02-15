import PromoCodeModel from "./promocodes.model";
import {ErrorResponse, SuccessResponse} from "../../constants/response.constant";
import {askIsValidate} from "./promocodes.utils";
import {NotValidAskResponse, ValidAskResponse} from "./promocodes.constants";

export default class PromoCodeController {

    /**
     * Create a document of PromoCode
     * @param req
     * @param res
     */
    static create(req, res) {
        PromoCodeModel.create(req.body)
            .then(data => res.status(200).send(SuccessResponse(data)))
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    res.status(422).send(ErrorResponse(err));
                } else {
                    res.status(500).send(ErrorResponse(err));
                }
            });
    };

    static ask(req, res) {
        const promoCode = req.body.promocode_name;
        const params = req.body.params;
        if(!promoCode) res.status(404).send(ErrorResponse('promocode_name params is required'));
        PromoCodeModel.findOne({ name: promoCode})
            .then(data => {
                if (!data) return res.status(404).send(ErrorResponse('Promocode not found'));

                const isValid = askIsValidate(data.restrictions, params);
                if(isValid) {
                    res.status(200).send(ValidAskResponse(promoCode, data.avantage));
                } else {
                    res.status(403).send(NotValidAskResponse(promoCode, {}));
                }
            })
            .catch(err => res.status(500).send(ErrorResponse(err)));
    }
}
