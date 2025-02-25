"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketStockClient = void 0;
const client_1 = require("../client");
class WebSocketStockClient extends client_1.WebSocketClient {
    subscribe(params) {
        super.subscribe(params);
    }
    unsubscribe(params) {
        super.unsubscribe(params);
    }
}
exports.WebSocketStockClient = WebSocketStockClient;
