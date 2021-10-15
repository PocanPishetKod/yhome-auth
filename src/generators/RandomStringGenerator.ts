import sjcl = require("sjcl");

export class RandomStringGenerator {
    private toBase64String(array: number[]): string {
        return sjcl.codec.base64url.fromBits(array);
    }

    public generate(): string {
        return this.toBase64String(sjcl.random.randomWords(8));
    }
}