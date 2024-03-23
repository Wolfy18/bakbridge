import { useSessionContext } from 'context/SessionContext';
import { useCallback } from 'react';

interface useBakClientProps {
  getTransaction: (uuid: string) => Promise<TransactionProps>;
  mintTransaction: (uuid: string) => Promise<TransactionProps>;
  refundTransaction: (uuid: string) => Promise<TransactionProps>;
  submitRequest: (data: OutputAssetProps[]) => Promise<OutputAssetProps[]>;
  uploadIPFSFile: (data: File) => Promise<AttachmentProps>;
}

const useBakClient = (): useBakClientProps => {
  const { client } = useSessionContext();

  const getTransaction = useCallback(
    async (uuid: string) => {
      return (await client.get(`/transactions/${uuid}/`)).data;
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
      return (await client.post(`/files/`, { file: data })).data;
    },
    [client]
  );

  return {
    getTransaction,
    mintTransaction,
    refundTransaction,
    submitRequest,
    uploadIPFSFile,
  };
};

export default useBakClient;
