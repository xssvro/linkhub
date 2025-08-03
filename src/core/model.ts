export interface AiConfig {
    apiKey: string;
    apiUrl: string;
    name: string;
}

export class Model {
    readonly apiKey: string;
    readonly apiUrl: string;
    readonly name: string;

    constructor(config: AiConfig) {
        this.apiKey = config.apiKey;
        this.apiUrl = config.apiUrl;
        this.name = config.name;
    }
}