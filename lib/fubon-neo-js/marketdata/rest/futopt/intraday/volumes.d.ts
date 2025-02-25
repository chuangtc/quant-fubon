import { RestClientRequest } from '../../client';
export interface RestFutOptIntradayVolumesParams {
    symbol: string;
    session?: 'afterhours';
}
export interface RestFutOptIntradayVolumesResponse {
    date: string;
    type: string;
    exchange: string;
    symbol: string;
    data: Array<{
        price: number;
        volume: number;
    }>;
}
export declare const volumes: (request: RestClientRequest, params: RestFutOptIntradayVolumesParams) => Promise<RestFutOptIntradayVolumesResponse>;
