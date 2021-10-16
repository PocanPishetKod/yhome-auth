export class HttpClient {
    public async get(url: string): Promise<void> {
        let result = await fetch(url, { credentials: "same-origin" });
        if (result.redirected) {
            window.location.href = result.url;
        }
    }

    public async postForm(url: string, formData: FormData): Promise<any> {
        let data = new URLSearchParams();
        formData.forEach((value, key, parent) => {
            data.append(key, value.toString());
        });
        let result = await fetch(url, { 
            method: "POST",
            body: data,
            credentials: "include"
        });

        if (!result.ok) {
            console.log(result);
            throw new Error("Response error. Status code: " + result.status.toString());
        }

        return await result.json();
    }
}