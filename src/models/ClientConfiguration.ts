export class ClientConfiguration {
    public readonly clientId: string;
    public readonly scope: string;
    public readonly redirectUri: string;
    public readonly responseType: string;

    constructor(clientId: string, scope: string,
        redirectUri: string) {
            this.clientId = clientId;
            this.scope = this.buildScope(scope);
            this.redirectUri = redirectUri;
            this.responseType = "code";
    }

    private buildScope(scope: string): string {
        if (scope.includes("offline_access")) {
            return;
        }

        return scope[scope.length - 1] == " " ? 
            scope + "offline_access" : scope + " offline_access";
    }
}