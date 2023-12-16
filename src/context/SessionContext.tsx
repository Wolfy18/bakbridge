import React, { createContext, useContext, PropsWithChildren } from 'react';

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

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
  refreshToken,
  testnet,
  authUrl,
  baseUrl,
  transactionUuid,
  policyId,
  showTransaction,
  children,
}) => {
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
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
