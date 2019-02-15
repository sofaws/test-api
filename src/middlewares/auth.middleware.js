import jwt from 'jsonwebtoken';
import {ErrorResponse} from "../constants/response.constant";

export default function isAuth(req, res, next) {
    if(process.env.NODE_ENV === "test") return next();

    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, 'fakeprivatekeyputtoenv', (err, authorizedData) => {
            if(err){
                return res.status(403).send(ErrorResponse('Token isnot valid'));
            } else {
                next()
            }
        })

    } else {
        res.status(403).send(ErrorResponse('no token'));
    }
}
