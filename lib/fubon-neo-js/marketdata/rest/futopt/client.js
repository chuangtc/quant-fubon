"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestFutOptClient = void 0;
const client_1 = require("../client");
const products_1 = require("./intraday/products");
const tickers_1 = require("./intraday/tickers");
const ticker_1 = require("./intraday/ticker");
const quote_1 = require("./intraday/quote");
const candles_1 = require("./intraday/candles");
const trades_1 = require("./intraday/trades");
const volumes_1 = require("./intraday/volumes");
class RestFutOptClient extends client_1.RestClient {
    get intraday() {
        const request = this.request;
        return {
            products: (params) => (0, products_1.products)(request, params),
            tickers: (params) => (0, tickers_1.tickers)(request, params),
            ticker: (params) => (0, ticker_1.ticker)(request, params),
            quote: (params) => (0, quote_1.quote)(request, params),
            candles: (params) => (0, candles_1.candles)(request, params),
            trades: (params) => (0, trades_1.trades)(request, params),
            volumes: (params) => (0, volumes_1.volumes)(request, params),
        };
    }
}
exports.RestFutOptClient = RestFutOptClient;
