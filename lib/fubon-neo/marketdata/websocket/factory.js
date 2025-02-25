"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClientFactory = void 0;
const client_1 = require("./stock/client");
const client_2 = require("./futopt/client");
const constants_1 = require("../constants");
const client_factory_1 = require("../client-factory");
const enums_1 = require("../enums");
class WebSocketClientFactory extends client_factory_1.ClientFactory {
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
            let url = '';
            if (this.mode === enums_1.Mode.Normal) {
                url = `${constants_1.FUGLE_MARKETDATA_API_NORMAL_WEBSOCKET_BASE_URL}/${constants_1.FUGLE_MARKETDATA_API_NORMAL_VERSION}/${type}/streaming`;
            }
            else if (this.mode === enums_1.Mode.Speed) {
                url = `${constants_1.FUGLE_MARKETDATA_API_SPEED_WEBSOCKET_BASE_URL}/${constants_1.FUGLE_MARKETDATA_API_SPEED_VERSION}/${type}/streaming`;
            }
            /* istanbul ignore else */
            if (type === 'stock') {
                client = new client_1.WebSocketStockClient(this.mode, Object.assign(Object.assign({}, this.options), { url }));
            }
            else if (type === 'futopt') {
                client = new client_2.WebSocketFutOptClient(this.mode, Object.assign(Object.assign({}, this.options), { url }));
            }
            else {
                throw new TypeError('invalid client type');
            }
            this.clients.set(type, client);
        }
        return client;
    }
}
exports.WebSocketClientFactory = WebSocketClientFactory;
