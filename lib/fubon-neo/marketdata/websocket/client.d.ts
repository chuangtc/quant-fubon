/// <reference types="node" />
import * as events from 'events';
import { Mode } from '../enums';
export interface WebSocketClientOptions {
    url: string;
    apiKey?: string;
    bearerToken?: string;
    sdkToken?: string;
}
export declare class WebSocketClient extends events.EventEmitter {
    protected readonly mode: Mode;
    protected readonly options: WebSocketClientOptions;
    private socket;
    private missedPongs;
    private pingTimerId;
    constructor(mode: Mode, options: WebSocketClientOptions);
    bindEvents(): void;
    connect(): Promise<unknown>;
    private detectConnectionStatus;
    disconnect(): void;
    subscribe(params: {
        channel: string;
        [key: string]: any;
    }): void;
    unsubscribe(params: {
        id?: string;
        ids?: string[];
    }): void;
    ping(params: {
        state?: any;
    }): void;
    subscriptions(): void;
    private authenticate;
    private send;
    private handleMessage;
}
