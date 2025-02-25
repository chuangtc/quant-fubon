import { WebSocketStockClient } from './stock/client';
import { WebSocketFutOptClient } from './futopt/client';
import { ClientFactory } from '../client-factory';
export declare class WebSocketClientFactory extends ClientFactory {
    private readonly clients;
    get stock(): WebSocketStockClient;
    get futopt(): WebSocketFutOptClient;
    private getClient;
}
