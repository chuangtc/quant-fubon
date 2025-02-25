"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickers = void 0;
const tickers = (request, params) => {
    return request('intraday/tickers', params);
};
exports.tickers = tickers;
