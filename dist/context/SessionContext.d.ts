import { AxiosInstance } from 'axios';
import React, { PropsWithChildren } from 'react';
export declare const useSessionContext: () => SessionContextProps & {
    client: AxiosInstance;
};
export declare const SessionProvider: React.FC<PropsWithChildren & SessionContextProps>;
