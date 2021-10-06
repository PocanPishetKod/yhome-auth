import { Pkce } from "./Pkce";

export interface IAuthContext {
    readonly clientId: string;
    readonly state: string;
    readonly pkce: Pkce;
}

export class AuthContext implements IAuthContext {
    public readonly clientId: string;
    public readonly state: string;
    public readonly pkce: Pkce;

    constructor(clientId: string, state: string, pkce: Pkce) {
        this.clientId = clientId;
        this.state = state;
        this.pkce = pkce;
    }

    public static create(context: IAuthContext): AuthContext {
        return new AuthContext(context.clientId, context.state, context.pkce);
    }
}