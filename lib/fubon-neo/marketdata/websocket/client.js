"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClient = void 0;
const events = require("events");
const WebSocket = require("isomorphic-ws");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
class WebSocketClient extends events.EventEmitter {
    constructor(mode = enums_1.Mode.Speed, options) {
        super();
        this.mode = mode;
        this.options = options;
        this.missedPongs = 0;
        this.bindEvents();
    }
    bindEvents() {
        this.on(constants_1.CONNECT_EVENT, () => this.authenticate());
        this.on(constants_1.MESSAGE_EVENT, (message) => this.handleMessage(message));
    }
    connect() {
        this.socket = new WebSocket(this.options.url);
        this.socket.onopen = () => this.emit(constants_1.CONNECT_EVENT);
        this.socket.onmessage = (event) => this.emit(constants_1.MESSAGE_EVENT, event.data);
        this.socket.onerror = (event) => this.emit(constants_1.ERROR_EVENT, event.error);
        this.socket.onclose = (event) => this.emit(constants_1.DISCONNECT_EVENT, event);
        return new Promise((resolve, reject) => {
            this.once(constants_1.AUTHENTICATED_EVENT, (data) => resolve(data));
            this.once(constants_1.UNAUTHENTICATED_EVENT, (data) => reject(data));
        });
    }
    detectConnectionStatus(state) {
        try {
            this.ping({ state: state });
            this.missedPongs += 1;
            if (this.missedPongs > 2) {
                this.disconnect();
                return;
            }
        }
        catch (error) {
            console.error(`Failed to send ping: ${error}`);
            this.disconnect();
            return;
        }
    }
    disconnect() {
        this.socket.close();
        clearInterval(this.pingTimerId);
    }
    subscribe(params) {
        if (this.mode === enums_1.Mode.Speed &&
            ['aggregates', 'candles'].includes(params.channel))
            throw new Error("speed mode don't support aggregate and candles channel");
        this.send({ event: 'subscribe', data: params });
    }
    unsubscribe(params) {
        this.send({ event: 'unsubscribe', data: params });
    }
    ping(params) {
        this.send({ event: 'ping', data: params });
    }
    subscriptions() {
        this.send({ event: 'subscriptions' });
    }
    authenticate() {
        if (this.options.apiKey) {
            this.send({ event: 'auth', data: { apikey: this.options.apiKey } });
        }
        if (this.options.bearerToken) {
            this.send({ event: 'auth', data: { token: this.options.bearerToken } });
        }
        if (this.options.sdkToken) {
            this.send({ event: 'auth', data: { sdkToken: this.options.sdkToken } });
        }
    }
    send(message) {
        if (this.socket.readyState !== 1)
            return;
        this.socket.send(JSON.stringify(message));
    }
    handleMessage(message) {
        try {
            const { event, data } = JSON.parse(message);
            if (event === constants_1.AUTHENTICATED_EVENT) {
                this.emit(constants_1.AUTHENTICATED_EVENT, data);
                this.pingTimerId = setInterval(() => {
                    this.detectConnectionStatus();
                }, 30000);
            }
            if (event === constants_1.ERROR_EVENT) {
                if (data && data.message === constants_1.UNAUTHENTICATED_MESSAGE) {
                    this.emit(constants_1.UNAUTHENTICATED_EVENT, data);
                }
            }
            if (event === 'pong') {
                this.missedPongs = 0;
            }
        }
        catch (err) { }
    }
}
exports.WebSocketClient = WebSocketClient;
