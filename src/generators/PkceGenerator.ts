import { Pkce } from "../models/Pkce";
import { UuidGenerator } from "./UuidGenerator";
import sjcl = require('sjcl');

export class PkceGenerator {
    public generate(): Pkce {
        let codeVerifier = new UuidGenerator().generate();
        let codeChallengeBytes = sjcl.hash.sha256.hash(codeVerifier);
        let codeChallenge = String.fromCharCode(...codeChallengeBytes);

        return new Pkce(codeVerifier, codeChallenge);
    }
}