import { RestClientRequest } from '../../client';
export interface RestFutOptIntradayTickerParams {
    symbol: string;
    session?: 'afterhours';
}
export interface RestFutOptIntradayTickerResponse {
    date: string;
    type: string;
    exchange: string;
    symbol: string;
    name: string;
    referencePrice: number;
    startDate: string;
    endDate: string;
    settlementDate: string;
}
export declare const ticker: (request: RestClientRequest, params: RestFutOptIntradayTickerParams) => Promise<RestFutOptIntradayTickerResponse>;
