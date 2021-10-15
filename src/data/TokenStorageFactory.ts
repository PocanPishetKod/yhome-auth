import { ITokenStorage } from "./ITokenStorage";
import { TokenCdStorage } from "./TokenCdStorage";
import { TokenLocalStorage } from "./TokenLocalStorage";

export class TokenStorageFactory {
    public create(cdsWindow?: Window): ITokenStorage {
        return cdsWindow ? new TokenCdStorage(cdsWindow) : new TokenLocalStorage();
    }
}