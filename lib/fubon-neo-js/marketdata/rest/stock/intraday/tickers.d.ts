import { RestClientRequest } from '../../client';
export interface RestStockIntradayTickersParams {
    type: string;
    exchange?: string;
    market?: string;
    industry?: string;
    isNormal?: boolean;
    isAttention?: boolean;
    isDisposition?: boolean;
    isHalted?: boolean;
}
export interface RestStockIntradayTickersResponse {
    date: string;
    type: string;
    exchange: string;
    market?: string;
    industry?: string;
    isNormal?: boolean;
    isAttention?: boolean;
    isDisposition?: boolean;
    isHalted?: boolean;
    data: Array<{
        symbol: string;
        name: string;
    }>;
}
export declare const tickers: (request: RestClientRequest, params: RestStockIntradayTickersParams) => Promise<RestStockIntradayTickersResponse>;
