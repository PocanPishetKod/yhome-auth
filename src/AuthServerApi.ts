import { AuthConfiguration } from "./models/AuthConfiguration";
import { HttpClient } from "./http/HttpClient";
import { ITokenResult } from "./models/ITokenResult";

export class AuthServerApi {
    private readonly _httpClient: HttpClient;
    private readonly _authConfiguration: AuthConfiguration;
    private readonly _authorizeEndpoint: string;
    private readonly _tokenEndpoint: string;

    constructor(authConfiguration: AuthConfiguration) {
        this._httpClient = new HttpClient();
        this._authorizeEndpoint = `${authConfiguration.authirity}/connect/authorize`;
        this._tokenEndpoint = `${authConfiguration.authirity}/connect/token`;
    }

    private buildGetCodeUrl(state: string, codeChallenge: string): string {
        return `${this._authorizeEndpoint}
        ?client_id=${this._authConfiguration.clientConfiguration.clientId}
        &scope=${this._authConfiguration.clientConfiguration.scope}
        &response_type=${this._authConfiguration.clientConfiguration.responseType}
        &redirect_uri=${this._authConfiguration.clientConfiguration.redirectUri}
        &state=${state}
        &code_challenge_method=S256
        &code_challenge=${codeChallenge}`
    }

    public async authorizeGetCode(state: string, codeChallenge: string): Promise<void> {
        await this._httpClient.get(this.buildGetCodeUrl(state, codeChallenge));
    }

    public async authorizeGetToken(codeVirifier: string): Promise<ITokenResult> {
        let formData = new FormData();
        formData.append("grant_type", "authorization_code");
        formData.append("code_verifier", codeVirifier);
        formData.append("client_id",
            this._authConfiguration.clientConfiguration.clientId);
        formData.append("redirect_uri",
            this._authConfiguration.clientConfiguration.redirectUri);

        return await this._httpClient.postForm(this._tokenEndpoint, formData);
    }
}