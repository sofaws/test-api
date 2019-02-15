import {version} from "../../../package";

export default class CommonController {
  static showVersion(req, res) {
        res.json({
            version
        })
    }
}
