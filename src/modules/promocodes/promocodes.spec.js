import chai, { expect } from 'chai';
import server from '../../index';
import {PREFIXS_ROUTE_NAME} from "../../routes";

chai.use(require('chai-http'));

describe('Products', () => {


    describe('/create promocodes', () => {
        it('it should decline the request because restrictions array is not valid', (done) => {
            const request = {
                "name": "WeatherCode",
                "avantage": {
                    "percent": 20
                },
                "restrictions": [
                    {
                        "restriction_name": "or",
                        "restrictions": [
                            {
                                "restriction_name": "ddeate",
                                "restrictions": {
                                    "after": "2017-05-02",
                                    "before": "2020-05-02"
                                }
                            },
                            {
                                "restriction_name": "age",
                                "restrictions": {
                                    "eq": 40
                                }
                            },
                            {
                                "restriction_name": "age",
                                "restrictions": {
                                    "lt": 30,
                                    "gt": 15
                                }
                            }
                        ]
                    },
                    {
                        "restriction_name": "date",
                        "restrictions": {
                            "after": "2017-05-02",
                            "before": "2020-05-02"
                        }
                    }
                ]
            };
            chai.request(server)
                .post(`${PREFIXS_ROUTE_NAME.PROMOCODES}`)
                .send(request)
                .end((err, res) => {
                    expect(res.status).to.equal(422);
                    done();
                });
        });
    });

    describe('/create promocodes', () => {
        it('it should create a codepromo', (done) => {
            const request = {
                "name": "WeatherCodeTest",
                "avantage": {
                    "percent": 20
                },
                "restrictions": [
                    {
                        "restriction_name": "or",
                        "restrictions": [
                            {
                                "restriction_name": "age",
                                "restrictions": {
                                    "eq": 40
                                }
                            },
                            {
                                "restriction_name": "age",
                                "restrictions": {
                                    "lt": 30,
                                    "gt": 15
                                }
                            }
                        ]
                    },
                    {
                        "restriction_name": "date",
                        "restrictions": {
                            "after": "2017-05-02",
                            "before": "2020-05-02"
                        }
                    }
                ]
            };
            chai.request(server)
                .post(`${PREFIXS_ROUTE_NAME.PROMOCODES}`)
                .send(request)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });


    describe('/request promocodes', () => {
        it('it should decline the request because promocode_name dont exist', (done) => {
            const request = {
                "promocode_name": "WeatherCode",
                "params": {
                    "age": 41,
                    "city": "Paris"
                }
            };
            chai.request(server)
                .post(`${PREFIXS_ROUTE_NAME.PROMOCODES}/request`)
                .send(request)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });

        it('it should decline the request because age not match', (done) => {
            const request = {
                "promocode_name": "WeatherCodeTest",
                "params": {
                    "age": 41,
                    "city": "Paris"
                }
            };
            chai.request(server)
                .post(`${PREFIXS_ROUTE_NAME.PROMOCODES}/request`)
                .send(request)
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    expect(res.body.status).to.equal('denied');
                    expect(res.body.reasons[0].type).to.equal('or');
                    done();
                });
        });

        it('it should accept the request', (done) => {
            const request = {
                "promocode_name": "WeatherCodeTest",
                "params": {
                    "age": 40,
                    "city": "Paris"
                }
            };
            chai.request(server)
                .post(`${PREFIXS_ROUTE_NAME.PROMOCODES}/request`)
                .send(request)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal('accepted');
                    expect(res.body.avantage.percent).to.equal(20);
                    done();
                });
        });
    });




});
