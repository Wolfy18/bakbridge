declare const createClient: ({ baseUrl, userToken, headers, }: {
    baseUrl?: string | undefined;
    userToken?: string | undefined;
    headers?: {
        [key: string]: string | number | boolean;
    } | undefined;
}) => import("axios").AxiosInstance;
export { createClient };
