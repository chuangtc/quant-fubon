import { RestClientRequest } from '../../client';
export interface RestStockSnapshotQuotesParams {
    market: 'TSE' | 'OTC' | 'ESB' | 'TIB' | 'PSB';
    type?: 'ALL' | 'ALLBUT0999' | 'COMMONSTOCK';
}
export interface RestStockSnapshotQuotesResponse {
    date: string;
    time: string;
    market: string;
    data: Array<{
        type: string;
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
        lastUpdated: number;
    }>;
}
export declare const quotes: (request: RestClientRequest, params: RestStockSnapshotQuotesParams) => Promise<RestStockSnapshotQuotesResponse>;
