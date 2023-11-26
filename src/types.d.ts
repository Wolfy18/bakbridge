interface AssetProps {
  uuid: string;
}

interface SessionContextProps {
  transactionUuid?: string;
  policyId?: string;
  accesToken?: string;
  refreshToken?: string;
  initialData?: AssetProps[];
  testnet?: boolean;
  authUrl?: string;
  baseUrl?: string;
}
