import { RestClientRequest } from '../../client';
export interface RestStockHistoricalCandlesParams {
    symbol: string;
    from?: string;
    to?: string;
    fields?: string;
}
export interface RestStockHistoricalCandlesResponse {
    symbol: string;
    type: string;
    exchange: string;
    market: string;
    data: Array<{
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
        turnover: number;
        change: number;
    }>;
}
export declare const candles: (request: RestClientRequest, params: RestStockHistoricalCandlesParams) => Promise<RestStockHistoricalCandlesResponse>;
