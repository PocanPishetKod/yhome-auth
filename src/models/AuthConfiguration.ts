import { ClientConfiguration } from "./ClientConfiguration";

export class AuthConfiguration {
    public readonly authority: string;
    public readonly clientConfiguration: ClientConfiguration;
    public readonly cdsWindow: Window;

    constructor(clientId: string, scope: string,
        redirectUri: string, authority: string, cdsWindow: Window) {
            this.authority = authority;
            this.clientConfiguration =
                new ClientConfiguration(clientId, scope, redirectUri);
            this.cdsWindow = cdsWindow;
        }
}