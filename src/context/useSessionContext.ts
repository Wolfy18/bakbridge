import { createContext } from 'react';

interface AssetProps {
  uuid: string;
}

interface SessionContextProps {
  transactionUuid?: string;
  accesToken?: string;
  refreshToken?: string;
  initialData?: AssetProps[];
  testnet?: boolean;
  authUrl?: string;
  baseUrl?: string;
}

const SessionContext = createContext<SessionContextProps>({});

export default SessionContext;
