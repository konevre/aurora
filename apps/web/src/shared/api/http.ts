type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpClientOptions = {
    baseUrl?: string;
    defaultHeaders?: HeadersInit;
    credentials?: RequestCredentials;
};

export type RequestOptions = Omit<RequestInit, "method"> & {
    searchParams?: Record<string, string | number | boolean | undefined>;
    json?: unknown;
};

/**
 * Utility class for making HTTP requests.
 *
 * @param {HttpClientOptions} options - The options for the HTTP client.
 * @param {string} options.baseUrl - The base URL for the HTTP client.
 * @param {HeadersInit} options.defaultHeaders - The default headers for the HTTP client.
 * @param {RequestCredentials} options.credentials - The credentials for the HTTP client.
 * @returns {HttpClient} - The HTTP client
 * @example
 * const request = new HttpClient({
 *     baseUrl: "http://localhost:4000",
 *     defaultHeaders: {
 *         "Content-Type": "application/json"
 *     }
 * });
 *
 * const response = await request.get("/api/users");
 * console.log(response);
 *
 *
 * @example
 * const response = await request.post("/api/users", {
 *     json: {
 *         name: "John Doe"
 *     }
 * });
 *
 * console.log(response);
 *
 * @example
 * const response = await request.put("/api/users/1", {
 *     json: {
 *         name: "John Doe"
 *     }
 * });
 *
 * console.log(response);
 *
 * @example
 * const response = await request.patch("/api/users/1", {
 *     json: {
 *         name: "John Doe"
 *     }
 * });
 */
export class HttpClient {
    private readonly baseUrl: string;
    private readonly defaultHeaders: HeadersInit;
    private readonly credentials?: RequestCredentials;

    constructor(options: HttpClientOptions = {}) {
        const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        this.baseUrl = options.baseUrl ?? envBaseUrl ?? "http://localhost:4000";
        this.defaultHeaders = options.defaultHeaders ?? {};
        this.credentials = options.credentials;
    }

    private buildUrl(
        pathname: string,
        searchParams?: RequestOptions["searchParams"]
    ) {
        const url = new URL(
            pathname.replace(/^\//, ""),
            this.baseUrl.endsWith("/") ? this.baseUrl : `${this.baseUrl}/`
        );
        if (searchParams) {
            Object.entries(searchParams).forEach(([key, value]) => {
                if (value !== undefined)
                    url.searchParams.set(key, String(value));
            });
        }
        return url.toString();
    }

    private makeRequest<T>(
        method: HttpMethod,
        pathname: string,
        options: RequestOptions = {}
    ) {
        const { json, searchParams, headers, ...rest } = options;
        const finalHeaders: HeadersInit = {
            ...(this.defaultHeaders || {}),
            ...(headers || {})
        };

        const init: RequestInit = {
            method,
            headers: finalHeaders,
            credentials: this.credentials,
            ...rest
        };

        if (json !== undefined) {
            (finalHeaders as Record<string, string>)["Content-Type"] =
                "application/json";
            init.body = JSON.stringify(json);
        }

        const url = this.buildUrl(pathname, searchParams);
        return fetch(url, init) as Promise<Response>;
    }

    get(pathname: string, options?: RequestOptions) {
        return this.makeRequest("GET", pathname, options);
    }
    post(pathname: string, options?: RequestOptions) {
        return this.makeRequest("POST", pathname, options);
    }
    put(pathname: string, options?: RequestOptions) {
        return this.makeRequest("PUT", pathname, options);
    }
    patch(pathname: string, options?: RequestOptions) {
        return this.makeRequest("PATCH", pathname, options);
    }
    delete(pathname: string, options?: RequestOptions) {
        return this.makeRequest("DELETE", pathname, options);
    }
}

export const request = new HttpClient({ credentials: "include" });
