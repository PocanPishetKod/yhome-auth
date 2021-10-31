import {IRequest, IResponse, RequestType } from "yhome-cds-interface";
import { ITokenData } from "../models/ITokenData";
import { ITokenStorage } from "./ITokenStorage";

export class TokenCdStorage implements ITokenStorage {
    private readonly _cdsWindow: Window;

    constructor(cdsWindow: Window) {
        this._cdsWindow = cdsWindow;
    }

    private sendRequest(requestType: RequestType, tokenData?: ITokenData): void {
        let request: IRequest = { 
            requestType: requestType,
            token: tokenData?.accessToken,
            refreshToken: tokenData?.refreshToken
        };

        this._cdsWindow.postMessage(JSON.stringify(request), this._cdsWindow.origin);
    }

    private handleResponse(event: MessageEvent<string>, resolve, reject): void {
        let response = JSON.parse(event.data) as IResponse;
        if (!response.ok) {
            console.log("Ошибка обращения в cds.");
            if (response.errorMessage) {
                console.log("Error message: " + response.errorMessage);
            }
            reject(new Error(response.errorMessage));
            return;
        }

        resolve({ 
            accessToken: response.token,
            refreshToken: response.refreshToken
        } as ITokenData);
    }

    private buildPromise<T>(requestType: RequestType, tokenData?: ITokenData): Promise<T> {
        return new Promise((resolve, reject) => {
            addEventListener("message", (event: MessageEvent<string>) => {
                this.handleResponse(event, resolve, reject);
            }, { once: true });

            this.sendRequest(requestType, tokenData);
        });
    }

    public save(tokenData: ITokenData): Promise<void> {
        return this.buildPromise(RequestType.Save, tokenData);
    }

    public get(): Promise<ITokenData> {
        return this.buildPromise<ITokenData>(RequestType.Get);
    }
}