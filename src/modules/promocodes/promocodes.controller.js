import PromoCodeModel from "./promocodes.model";
import {ErrorResponse, SuccessResponse} from "../../constants/response.constant";
import {requestIsValid, isValidRestrictionsFormat} from "./promocodes.utils";
import {NotValidAskResponse, ValidAskResponse} from "./promocodes.constants";

export default class PromoCodeController {

    /**
     * Create a document of PromoCode
     * @param req
     * @param res
     */
    static create(req, res) {
        const errors = isValidRestrictionsFormat(req.body.restrictions)
        if(errors.length) return res.status(422).send(ErrorResponse(errors));

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

    static request(req, res) {
        const promoCode = req.body.promocode_name;
        const params = req.body.params;
        if(!promoCode) res.status(404).send(ErrorResponse('promocode_name params is required'));
        PromoCodeModel.findOne( { name: promoCode})
            .then( async data => {
                if (!data) return res.status(404).send(ErrorResponse('Promocode not found'));

                const errors = await requestIsValid(data.restrictions, params);
                if(errors.length === 0) {
                    res.status(200).send(ValidAskResponse(promoCode, data.avantage));
                } else {
                    res.status(403).send(NotValidAskResponse(promoCode, errors));
                }
            })
            .catch(err => res.status(500).send(ErrorResponse(err)));
    }
}
