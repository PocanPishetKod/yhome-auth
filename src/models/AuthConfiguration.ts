import { ClientConfiguration } from "./ClientConfiguration";

export class AuthConfiguration {
    public readonly authirity: string;
    public readonly clientConfiguration: ClientConfiguration;

    constructor(clientId: string, scope: string,
        redirectUri: string, authority: string) {
            this.authirity = authority;
            this.clientConfiguration =
                new ClientConfiguration(clientId, scope, redirectUri);
        }
}