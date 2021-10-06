export interface IUserContext {
    accessToken: string;
}

export class UserContext {
    public readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public static create(context: IUserContext): UserContext {
        return new UserContext(context.accessToken);
    }
}