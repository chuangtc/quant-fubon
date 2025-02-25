"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFactory = void 0;
const enums_1 = require("./enums");
class ClientFactory {
    constructor(options, mode = enums_1.Mode.Speed) {
        this.options = options;
        this.mode = mode;
        const { apiKey, bearerToken, sdkToken } = options;
        const tokenCount = [apiKey, bearerToken, sdkToken].filter(Boolean).length;
        if (tokenCount === 0) {
            throw new TypeError('One of the "apiKey", "bearerToken", or "sdkToken" options must be specified');
        }
        if (tokenCount > 1) {
            throw new TypeError('Only one of the "apiKey", "bearerToken", or "sdkToken" options must be specified');
        }
    }
}
exports.ClientFactory = ClientFactory;
