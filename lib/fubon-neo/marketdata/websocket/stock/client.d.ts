import { WebSocketClient } from '../client';
export interface WebSocketStockSubscribeParams {
    channel: 'trades' | 'books' | 'candles' | 'aggregates';
    symbol?: string;
    symbols?: string[];
    intradayOddLot?: boolean;
}
export interface WebSocketStockUnsubscribeParams {
    id?: string;
    ids?: string[];
}
export declare class WebSocketStockClient extends WebSocketClient {
    subscribe(params: WebSocketStockSubscribeParams): void;
    unsubscribe(params: WebSocketStockUnsubscribeParams): void;
}
