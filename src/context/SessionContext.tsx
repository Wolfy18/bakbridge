import { AxiosInstance } from 'axios';
import { createClient } from 'client';
import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';

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
  const [userToken, setUserToken] = useState<string | undefined>(accessToken);

  const client = createClient({ baseUrl, userToken, headers });

  useEffect(() => {
    console.log('reload...');
  }, [userToken]);

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
        setUserToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
