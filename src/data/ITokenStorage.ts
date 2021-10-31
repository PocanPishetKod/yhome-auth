import { ITokenData } from "../models/ITokenData";

export interface ITokenStorage {
    save(tokenData: ITokenData): Promise<void>;
    get(): Promise<ITokenData>;
}