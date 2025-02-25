"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestStockClient = void 0;
const client_1 = require("../client");
const tickers_1 = require("./intraday/tickers");
const ticker_1 = require("./intraday/ticker");
const quote_1 = require("./intraday/quote");
const candles_1 = require("./intraday/candles");
const trades_1 = require("./intraday/trades");
const volumes_1 = require("./intraday/volumes");
const candles_2 = require("./historical/candles");
const stats_1 = require("./historical/stats");
const quotes_1 = require("./snapshot/quotes");
const movers_1 = require("./snapshot/movers");
const actives_1 = require("./snapshot/actives");
class RestStockClient extends client_1.RestClient {
    get intraday() {
        const request = this.request;
        return {
            tickers: (params) => (0, tickers_1.tickers)(request, params),
            ticker: (params) => (0, ticker_1.ticker)(request, params),
            quote: (params) => (0, quote_1.quote)(request, params),
            candles: (params) => (0, candles_1.candles)(request, params),
            trades: (params) => (0, trades_1.trades)(request, params),
            volumes: (params) => (0, volumes_1.volumes)(request, params),
        };
    }
    get historical() {
        const request = this.request;
        return {
            candles: (params) => (0, candles_2.candles)(request, params),
            stats: (params) => (0, stats_1.stats)(request, params),
        };
    }
    get snapshot() {
        const request = this.request;
        return {
            quotes: (params) => (0, quotes_1.quotes)(request, params),
            movers: (params) => (0, movers_1.movers)(request, params),
            actives: (params) => (0, actives_1.actives)(request, params),
        };
    }
}
exports.RestStockClient = RestStockClient;
