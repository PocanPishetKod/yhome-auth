import { UserContext } from "../models/UserContext";

export class UserContextStorage {
    private readonly _key = "user_context";

    public save(userContext: UserContext): void {
        localStorage.setItem(this._key, JSON.stringify(userContext));
    }

    public get(): UserContext {
        let item = localStorage.getItem(this._key);
        return item != null ? UserContext.create(JSON.parse(item)) : null;
    }
}