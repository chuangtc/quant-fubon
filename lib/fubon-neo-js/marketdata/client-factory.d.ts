import { Mode } from './enums';
export interface ClientOptions {
    apiKey?: string;
    sdkToken?: string;
    bearerToken?: string;
}
export declare abstract class ClientFactory {
    protected readonly options: ClientOptions;
    protected readonly mode: Mode;
    constructor(options: ClientOptions, mode?: Mode);
}
