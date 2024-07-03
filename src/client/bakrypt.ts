import { useSessionContext } from 'context/SessionContext';
import { useCallback } from 'react';

interface useBakClientProps {
  getTransaction: (uuid: string) => Promise<TransactionProps>;
  mintTransaction: (uuid: string) => Promise<TransactionProps>;
  refundTransaction: (uuid: string) => Promise<TransactionProps>;
  submitRequest: (data: OutputAssetProps[]) => Promise<OutputAssetProps[]>;
  getCollectionByTxUuid: (uuid: string) => Promise<{ results: AssetProps[] }>;
  uploadIPFSFile: (data: File) => Promise<AttachmentProps>;
  authenticateWallet: ({
    address,
    signature,
    key,
  }: {
    address: string;
    signature: string;
    key: string;
  }) => Promise<AccessToken>;
}

const useBakClient = (): useBakClientProps => {
  const { client } = useSessionContext();

  const getTransaction = useCallback(
    async (uuid: string) => {
      return (await client.get(`/transactions/${uuid}/`)).data;
    },
    [client]
  );

  const getCollectionByTxUuid = useCallback(
    async (uuid: string) => {
      return (await client.get(`/assets/?search=${uuid}`)).data;
    },
    [client]
  );

  const mintTransaction = useCallback(
    async (uuid: string) => {
      return (await client.post(`/transactions/${uuid}/mint/`)).data;
    },
    [client]
  );

  const refundTransaction = useCallback(
    async (uuid: string) => {
      return (await client.post(`/transactions/${uuid}/refund/`)).data;
    },
    [client]
  );

  const submitRequest = useCallback(
    async (data: OutputAssetProps[]) => {
      return (await client.post(`/assets/`, data)).data;
    },
    [client]
  );

  const uploadIPFSFile = useCallback(
    async (data: File) => {
      client.defaults.headers['Content-Type'] = 'multipart/form-data';
      let res: Promise<AttachmentProps>;
      try {
        res = (await client.post(`/files/`, { file: data })).data;

        client.defaults.headers['Content-Type'] = 'application/json';
      } catch (error) {
        client.defaults.headers['Content-Type'] = 'application/json';
        throw Error('Unable to upload file.');
      }
      return res;
    },
    [client]
  );

  const authenticateWallet = useCallback(
    async ({
      address,
      signature,
      key,
    }: {
      address: string;
      signature: string;
      key: string;
    }) => {
      return (
        await client.post(`/addresses/${address}/verify/`, { signature, key })
      ).data;
    },
    [client]
  );

  return {
    getTransaction,
    mintTransaction,
    refundTransaction,
    submitRequest,
    uploadIPFSFile,
    getCollectionByTxUuid,
    authenticateWallet,
  };
};

export default useBakClient;
