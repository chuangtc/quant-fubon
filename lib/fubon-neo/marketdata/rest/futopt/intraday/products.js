"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const products = (request, params) => {
    return request(`intraday/products`, params);
};
exports.products = products;
