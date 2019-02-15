import CommonsModule from "./modules/common";
import PromoCodeModule from "./modules/promocodes";


export const PREFIXS_ROUTE_NAME = {
    BASE: '/',
    PROMOCODES: '/promocodes',
};

export const ROUTES_MODULES = [
    { prefix: PREFIXS_ROUTE_NAME.BASE, target: CommonsModule.Routes},
    { prefix: PREFIXS_ROUTE_NAME.PROMOCODES, target: PromoCodeModule.Routes},
];


