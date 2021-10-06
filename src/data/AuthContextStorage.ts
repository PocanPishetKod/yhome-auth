import { AuthContext, IAuthContext } from "../models/AuthContext";

export class AuthContextStorage {
    public save(context: AuthContext): void {
        localStorage.setItem(context.clientId, JSON.stringify(context));
    }

    public get(clientId: string): AuthContext {
        let parsedContext: IAuthContext = JSON
            .parse(localStorage.getItem(clientId));
        
        return AuthContext.create(parsedContext);
    }

    public clear(clientId: string): void {
        localStorage.removeItem(clientId);
    }
}