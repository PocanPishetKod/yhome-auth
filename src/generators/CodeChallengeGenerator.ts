import sjcl = require("sjcl");

export class CodeChallengeGenerator {
    public generate(codeVerifier: string): string {
        let codeChallengeBytes = sjcl.hash.sha256.hash(codeVerifier);
        return sjcl.codec.base64url.fromBits(codeChallengeBytes);
    }
}