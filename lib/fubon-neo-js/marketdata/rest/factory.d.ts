import { RestStockClient } from './stock/client';
import { RestFutOptClient } from './futopt/client';
import { ClientFactory } from '../client-factory';
export declare class RestClientFactory extends ClientFactory {
    private readonly clients;
    get stock(): RestStockClient;
    get futopt(): RestFutOptClient;
    private getClient;
}
