import axios, { AxiosInstance } from 'axios';
import React, { createContext, useContext, PropsWithChildren } from 'react';

const SessionContext = createContext<
  (SessionContextProps & { client: AxiosInstance }) | undefined
>(undefined);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};

const createClient = ({
  baseUrl,
  accessToken,
}: {
  baseUrl?: string;
  accessToken?: string;
  refreshToken?: string;
}) => {
  return axios.create({
    baseURL: baseUrl ? baseUrl : 'https://bakrypt.io/v1/',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const SessionProvider: React.FC<
  PropsWithChildren & SessionContextProps
> = ({
  accessToken,
  refreshToken,
  testnet,
  authUrl,
  baseUrl,
  transactionUuid,
  policyId,
  showTransaction,
  children,
}) => {
  const client = createClient({ baseUrl, accessToken, refreshToken });

  return (
    <SessionContext.Provider
      value={{
        accessToken,
        refreshToken,
        testnet,
        authUrl,
        baseUrl,
        transactionUuid,
        showTransaction,
        policyId,
        client,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
