import { ITokenStorage } from "./ITokenStorage";

const TokenKey: string = "token-key";

export class TokenLocalStorage implements ITokenStorage {
    public save(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            localStorage.setItem(TokenKey, token);
            resolve();
        });
    }
    public get(): Promise<string> {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem(TokenKey);
            resolve(token);
        });
    }
}