export interface ITokenStorage {
    save(token: string): Promise<void>;
    get(): Promise<string>;
}