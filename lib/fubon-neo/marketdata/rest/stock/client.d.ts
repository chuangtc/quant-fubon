import { RestClient } from '../client';
import { RestStockIntradayTickersParams } from './intraday/tickers';
import { RestStockIntradayTickerParams } from './intraday/ticker';
import { RestStockIntradayQuoteParams } from './intraday/quote';
import { RestStockIntradayCandlesParams } from './intraday/candles';
import { RestStockIntradayTradesParams } from './intraday/trades';
import { RestStockIntradayVolumesParams } from './intraday/volumes';
import { RestStockHistoricalCandlesParams } from './historical/candles';
import { RestStockHistoricalStatsParams } from './historical/stats';
import { RestStockSnapshotQuotesParams } from './snapshot/quotes';
import { RestStockSnapshotMoversParams } from './snapshot/movers';
import { RestStockSnapshotActivesParams } from './snapshot/actives';
export declare class RestStockClient extends RestClient {
    get intraday(): {
        tickers: (params: RestStockIntradayTickersParams) => Promise<import("./intraday/tickers").RestStockIntradayTickersResponse>;
        ticker: (params: RestStockIntradayTickerParams) => Promise<import("./intraday/ticker").RestStockIntradayTickerResponse>;
        quote: (params: RestStockIntradayQuoteParams) => Promise<import("./intraday/quote").RestStockIntradayQuoteResponse>;
        candles: (params: RestStockIntradayCandlesParams) => Promise<import("./intraday/candles").RestStockIntradayCandlesResponse>;
        trades: (params: RestStockIntradayTradesParams) => Promise<import("./intraday/trades").RestStockIntradayTradesResponse>;
        volumes: (params: RestStockIntradayVolumesParams) => Promise<import("./intraday/volumes").RestStockIntradayVolumesResponse>;
    };
    get historical(): {
        candles: (params: RestStockHistoricalCandlesParams) => Promise<import("./historical/candles").RestStockHistoricalCandlesResponse>;
        stats: (params: RestStockHistoricalStatsParams) => Promise<import("./historical/stats").RestStockHistoricalStatsResponse>;
    };
    get snapshot(): {
        quotes: (params: RestStockSnapshotQuotesParams) => Promise<import("./snapshot/quotes").RestStockSnapshotQuotesResponse>;
        movers: (params: RestStockSnapshotMoversParams) => Promise<import("./snapshot/movers").RestStockSnapshotMoversResponse>;
        actives: (params: RestStockSnapshotActivesParams) => Promise<import("./snapshot/actives").RestStockSnapshotActivesResponse>;
    };
}
