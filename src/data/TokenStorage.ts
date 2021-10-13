import {IRequest, IResponse, RequestType } from "yhome-cds-interface";

export class TokenStorage {
    private readonly _cdsWindow: Window;

    constructor(cdsWindow: Window) {
        this._cdsWindow = cdsWindow;
    }

    private sendRequest(requestType: RequestType, token?: string): void {
        let request: IRequest = { 
            requestType: requestType,
            token: token
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

        resolve(response.token);
    }

    private buildPromise<T>(requestType: RequestType, token?: string): Promise<T> {
        return new Promise((resolve, reject) => {
            addEventListener("message", (event: MessageEvent<string>) => {
                this.handleResponse(event, resolve, reject);
            }, { once: true });

            this.sendRequest(requestType, token);
        });
    }

    public save(token: string): Promise<void> {
        return this.buildPromise(RequestType.Save, token);
    }

    public get(): Promise<string> {
        return this.buildPromise<string>(RequestType.Get);
    }
}