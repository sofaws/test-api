import {version} from "../../../package";
import jwt from 'jsonwebtoken';

export default class CommonController {
  static showVersion(req, res) {
        res.json({
            version
        })
    }

    static fakeLogin(req, res) {
        jwt.sign({ usernamefake: "TEST"}, 'fakeprivatekeyputtoenv', { expiresIn: '1h' },(err, token) => {
            if(err) { console.log(err) }
            res.send(token);
        });
    }
}
