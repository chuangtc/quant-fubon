import { RestClient } from '../client';
import { RestFutOptIntradayProductsParams } from './intraday/products';
import { RestFutOptIntradayTickersParams } from './intraday/tickers';
import { RestFutOptIntradayTickerParams } from './intraday/ticker';
import { RestFutOptIntradayQuoteParams } from './intraday/quote';
import { RestFutOptIntradayCandlesParams } from './intraday/candles';
import { RestFutOptIntradayTradesParams } from './intraday/trades';
import { RestFutOptIntradayVolumesParams } from './intraday/volumes';
export declare class RestFutOptClient extends RestClient {
    get intraday(): {
        products: (params: RestFutOptIntradayProductsParams) => Promise<import("./intraday/products").RestFutOptIntradayProductsResponse>;
        tickers: (params: RestFutOptIntradayTickersParams) => Promise<import("./intraday/tickers").RestFutOptIntradayTickersResponse>;
        ticker: (params: RestFutOptIntradayTickerParams) => Promise<import("./intraday/ticker").RestFutOptIntradayTickerResponse>;
        quote: (params: RestFutOptIntradayQuoteParams) => Promise<import("./intraday/quote").RestFutOptIntradayQuoteResponse>;
        candles: (params: RestFutOptIntradayCandlesParams) => Promise<import("./intraday/candles").RestFutOptIntradayCandlesResponse>;
        trades: (params: RestFutOptIntradayTradesParams) => Promise<import("./intraday/trades").RestFutOptIntradayTradesResponse>;
        volumes: (params: RestFutOptIntradayVolumesParams) => Promise<import("./intraday/volumes").RestFutOptIntradayVolumesResponse>;
    };
}
