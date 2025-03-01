import { RestClientRequest } from '../../client';
export interface RestStockHistoricalStatsParams {
    symbol: string;
}
export interface RestStockHistoricalStatsResponse {
    date: string;
    type: string;
    exchange: string;
    market: string;
    symbol: string;
    name: string;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
    change: number;
    changePercent: number;
    tradeVolume: number;
    tradeValue: number;
    previousClose: number;
    week52High: number;
    week52Low: number;
}
export declare const stats: (request: RestClientRequest, params: RestStockHistoricalStatsParams) => Promise<RestStockHistoricalStatsResponse>;
