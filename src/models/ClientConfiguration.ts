export class ClientConfiguration {
    public readonly clientId: string;
    public readonly scope: string;
    public readonly redirectUri: string;
    public readonly responseType: string;

    constructor(clientId: string, scope: string,
        redirectUri: string) {
            this.clientId = clientId;
            this.scope = scope;
            this.redirectUri = redirectUri;
            this.responseType = "code";
        }
}