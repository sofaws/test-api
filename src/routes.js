import CommonsModule from "./modules/common";
import ProductModule from "./modules/products";


export const PREFIXS_ROUTE_NAME = {
    BASE: '/',
    PRODUCTS: '/products'
};

export const ROUTES_MODULES = [
    { prefix: PREFIXS_ROUTE_NAME.BASE, target: CommonsModule.Routes},
    { prefix: PREFIXS_ROUTE_NAME.PRODUCTS, target: ProductModule.Routes},
];


