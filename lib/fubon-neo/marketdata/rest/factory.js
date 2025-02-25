"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClientFactory = void 0;
const client_1 = require("./stock/client");
const client_2 = require("./futopt/client");
const client_factory_1 = require("../client-factory");
const constants_1 = require("../constants");
class RestClientFactory extends client_factory_1.ClientFactory {
    constructor() {
        super(...arguments);
        this.clients = new Map();
    }
    get stock() {
        return this.getClient('stock');
    }
    get futopt() {
        return this.getClient('futopt');
    }
    getClient(type) {
        let client = this.clients.get(type);
        if (!client) {
            const baseUrl = `${constants_1.FUGLE_MARKETDATA_API_REST_BASE_URL}/${constants_1.FUGLE_MARKETDATA_API_VERSION}/${type}`;
            /* istanbul ignore else */
            if (type === 'stock') {
                client = new client_1.RestStockClient(Object.assign(Object.assign({}, this.options), { baseUrl }));
            }
            else if (type === 'futopt') {
                client = new client_2.RestFutOptClient(Object.assign(Object.assign({}, this.options), { baseUrl }));
            }
            else {
                throw new TypeError('invalid client type');
            }
            this.clients.set(type, client);
        }
        return client;
    }
}
exports.RestClientFactory = RestClientFactory;
