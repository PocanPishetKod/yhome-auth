import { AuthServerApi } from "./AuthServerApi";
import { AuthContextStorage } from "./data/AuthContextStorage";
import { PkceGenerator } from "./generators/PkceGenerator";
import { StateGenerator } from "./generators/StateGenerator";
import { AuthConfiguration } from "./models/AuthConfiguration";
import { AuthContext } from "./models/AuthContext";

export class AuthService {
    private readonly _authConfiguration: AuthConfiguration;
    private readonly _stateGenerator: StateGenerator;
    private readonly _pkceGenerator: PkceGenerator;
    private readonly _authServerApi: AuthServerApi;
    private readonly _authContextStorage: AuthContextStorage;

    constructor(authtConfiguration: AuthConfiguration) {
        this._authConfiguration = authtConfiguration;
        this._stateGenerator = new StateGenerator();
        this._pkceGenerator = new PkceGenerator();
        this._authServerApi = new AuthServerApi(authtConfiguration);
        this._authContextStorage = new AuthContextStorage();
    }

    public async startAuthentication(): Promise<void> {
        let state = this._stateGenerator.generate();
        let pkce = this._pkceGenerator.generate();
        this._authContextStorage
            .save(new AuthContext(this._authConfiguration.clientConfiguration.clientId,
                state, pkce));
        
        try {
            await this._authServerApi.authorizeGetCode(state, pkce.codeChallenge);
        }
        catch (e) {
            this._authContextStorage
                .clear(this._authConfiguration.clientConfiguration.clientId);
        }
    }

    public async endAuthentication(): Promise<string> {
        let authContext = this._authContextStorage
            .get(this._authConfiguration.clientConfiguration.clientId);
        let result = await this._authServerApi
            .authorizeGetToken(authContext.pkce.codeVerifier);

        return result.access_token;
    }
}