"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
const fetch = require("isomorphic-fetch");
const queryString = require("query-string");
class RestClient {
    constructor(options) {
        this.options = options;
        this.request = async (endpoint, params) => {
            const url = queryString.stringifyUrl({ url: `${this.options.baseUrl}/${endpoint}`, query: params });
            const headers = Object.assign({}, this.options.apiKey && { 'X-API-KEY': this.options.apiKey }, this.options.bearerToken && { Authorization: `Bearer ${this.options.bearerToken}` }, this.options.sdkToken && { 'X-SDK-TOKEN': this.options.sdkToken });
            return fetch(url, { headers }).then(res => res.json());
        };
    }
}
exports.RestClient = RestClient;
