import { AxiosInstance } from 'axios';
import { createClient } from 'client';
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

export const SessionProvider: React.FC<
  PropsWithChildren & SessionContextProps
> = ({
  accessToken,
  baseUrl,
  transactionUuid,
  policyId,
  showTransaction,
  children,
  headers,
  onSuccess,
}) => {
  const client = createClient({ baseUrl, accessToken, headers });

  return (
    <SessionContext.Provider
      value={{
        accessToken,
        baseUrl,
        transactionUuid,
        showTransaction,
        policyId,
        client,
        onSuccess,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
