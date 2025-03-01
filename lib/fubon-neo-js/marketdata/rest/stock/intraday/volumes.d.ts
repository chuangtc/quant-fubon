import { RestClientRequest } from '../../client';
export interface RestStockIntradayVolumesParams {
    symbol: string;
    type?: 'oddlot';
}
export interface RestStockIntradayVolumesResponse {
    date: string;
    type: string;
    exchange: string;
    market: string;
    symbol: string;
    data: Array<{
        price: number;
        volume: number;
        volumeAtBid: number;
        volumeAtAsk: number;
    }>;
}
export declare const volumes: (request: RestClientRequest, params: RestStockIntradayVolumesParams) => Promise<RestStockIntradayVolumesResponse>;
