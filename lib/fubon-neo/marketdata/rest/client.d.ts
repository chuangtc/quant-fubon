export type RestClientRequest = (endpoint: string, params: Record<string, any>) => Promise<any>;
export interface RestClientOptions {
    baseUrl: string;
    apiKey?: string;
    sdkToken?: string;
    bearerToken?: string;
}
export declare abstract class RestClient {
    protected readonly options: RestClientOptions;
    constructor(options: RestClientOptions);
    protected request: (endpoint: string, params?: Record<string, any>) => Promise<any>;
}
