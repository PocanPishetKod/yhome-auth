export class HttpClient {
    public async get(url: string): Promise<void> {
        let result = await fetch(url);
        if (!result.ok) {
            console.log(result);
        }
    }

    public async postForm(url: string, formData: FormData): Promise<any> {
        let result = await fetch(url, { 
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData
        });

        if (!result.ok) {
            console.log(result);
        }

        return JSON.parse(await result.json());
    }
}