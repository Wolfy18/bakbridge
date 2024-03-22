interface AttachmentProps {
  uuid: string;
  file: string;
  name: string;
  filename: string;
  size: string;
  mimetype: string;
  ipfs: string;
  gateway: string;
  created_on: string;
}

interface TransactionProps {
  uuid: string;
  blockchain: string;
  status: string;
  status_description: string;
  fraud_status: string;
  issuer_address: string;
  policy_id: string;
  invalid_slot: string;
  cost: string;
  estimated_cost: string;
  convenience_fee: string;
  blockchain_fee: string;
  is_deleted: boolean;
  is_minted: boolean;
  is_voided: boolean;
  is_resubmitted: boolean;
  is_refunded: boolean;
  deposit_address: string;
  created_on: string;
  updated_on: string;
  expires_on: string;
  is_auto_processing: boolean;
  has_royalties: boolean;
  royalties_estimated_cost: string;
  royalties_minted: boolean;
  royalties_minted_on: string;
  royalties_burned: boolean;
  royalties_burned_on: string;
  royalties_rate: string;
  royalties: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  metadata: string;
}

interface AssetFileProps {
  name: string;
  src: string;
  mediaType?: string;
}

interface Attrs {
  [key: string]: string | number | boolean | object | [];
}

interface AssetProps {
  uuid?: string;
  blockchain: string;
  name: string;
  asset_name?: string;
  image: string;
  media_type?: string;
  fingerprint?: string;
  description?: string;
  files?: AssetFileProps[];
  attrs?: Attrs[];
  amount: number;
  royalties?: string;
  royalties_rate?: string;
  transaction?: string | TransactionProps;
}

interface IntakeAssetProps extends AssetProps {
  attrs?: Attrs[] | Attrs;
}

interface OutputAssetProps extends AssetProps {
  attrs?: Attrs;
}

interface SessionContextProps {
  transactionUuid?: string;
  policyId?: string;
  accessToken?: string;
  initialData?: string;
  baseUrl?: string;
  showTransaction?: boolean;
}

type NestedObject = {
  [key: string]: NestedObject | string | (NestedObject | string | AssetProps)[];
};
