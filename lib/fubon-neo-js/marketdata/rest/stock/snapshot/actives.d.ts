import { RestClientRequest } from '../../client';
export interface RestStockSnapshotActivesParams {
    market: 'TSE' | 'OTC' | 'ESB' | 'TIB' | 'PSB';
    trade: 'volume' | 'value';
    type?: 'ALL' | 'ALLBUT0999' | 'COMMONSTOCK';
}
export interface RestStockSnapshotActivesResponse {
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
export declare const actives: (request: RestClientRequest, params: RestStockSnapshotActivesParams) => Promise<RestStockSnapshotActivesResponse>;
