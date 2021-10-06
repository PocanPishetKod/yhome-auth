export class Pkce {
    public readonly codeVerifier: string;
    public readonly codeChallenge: string;

    constructor(codeVerifier: string, codeChallenge: string) {
        this.codeVerifier = codeVerifier;
        this.codeChallenge = codeChallenge;
    }
}