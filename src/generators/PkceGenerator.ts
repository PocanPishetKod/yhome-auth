import { Pkce } from "../models/Pkce";
import { CodeChallengeGenerator } from "./CodeChallengeGenerator";
import { RandomStringGenerator } from "./RandomStringGenerator";

export class PkceGenerator {
    public generate(): Pkce {
        let codeVerifier = new RandomStringGenerator().generate();
        let codeChallenge = new CodeChallengeGenerator().generate(codeVerifier);

        return new Pkce(codeVerifier, codeChallenge);
    }
}