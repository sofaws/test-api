import chai, { expect } from 'chai';
import server from '../../index';
import {PREFIXS_ROUTE_NAME} from "../../routes";
import { version } from "../../../package";

chai.use(require('chai-http'));

describe('Commons', () => {
    describe('/GET /', () => {
        it('it should GET the api version', (done) => {
            chai.request(server)
                .get(PREFIXS_ROUTE_NAME.BASE)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.version).to.equal(version);
                    done();
                });
        });
    });
});
