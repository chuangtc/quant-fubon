import { WebSocketClient } from '../client';
export interface WebSocketFutOptSubscribeParams {
    channel: 'trades' | 'books' | 'candles' | 'aggregates';
    symbol?: string;
    symbols?: string[];
    afterHours?: boolean;
}
export interface WebSocketFutOptUnsubscribeParams {
    id?: string;
    ids?: string[];
}
export declare class WebSocketFutOptClient extends WebSocketClient {
    subscribe(params: WebSocketFutOptSubscribeParams): void;
    unsubscribe(params: WebSocketFutOptUnsubscribeParams): void;
}
