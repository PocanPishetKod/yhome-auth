import { ITokenData } from "../models/ITokenData";
import { ITokenStorage } from "./ITokenStorage";

const TokenKey: string = "token-key";

export class TokenLocalStorage implements ITokenStorage {
    public save(tokenData: ITokenData): Promise<void> {
        return new Promise((resolve, reject) => {
            localStorage.setItem(TokenKey, JSON.stringify(tokenData));
            resolve();
        });
    }
    public get(): Promise<ITokenData> {
        return new Promise((resolve, reject) => {
            let tokenData = localStorage.getItem(TokenKey);
            resolve(JSON.parse(tokenData));
        });
    }
}