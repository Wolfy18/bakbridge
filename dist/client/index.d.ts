declare const createClient: ({ baseUrl, accessToken, headers, }: {
    baseUrl?: string | undefined;
    accessToken?: string | undefined;
    headers?: {
        [key: string]: string | number | boolean;
    } | undefined;
}) => import("axios").AxiosInstance;
export { createClient };
