import client from './client';

interface useBakClientProps {
  getTransaction: (uuid: string) => Promise<TransactionProps>;
  mintTransaction: (uuid: string) => Promise<TransactionProps>;
  refundTransaction: (uuid: string) => Promise<TransactionProps>;
  submitRequest: (data: AssetProps[]) => Promise<AssetProps[]>;
  uploadIPFSFile: (data: File) => Promise<AttachmentProps>;
}

const getTransaction = async (uuid: string) => {
  return (await client.get(`/transactions/${uuid}/`)).data;
};

const mintTransaction = async (uuid: string) => {
  return (await client.post(`/transactions/${uuid}/mint/`)).data;
};

const refundTransaction = async (uuid: string) => {
  return (await client.post(`/transactions/${uuid}/refund/`)).data;
};

const submitRequest = async (data: AssetProps[]) => {
  return (await client.post(`/assets/`, data)).data;
};

const uploadIPFSFile = async (data: File) => {
  client.defaults.headers['Content-Type'] = 'multipart/form-data';
  return (await client.post(`/files/`, { file: data })).data;
};

const useBakClient = (): useBakClientProps => {
  return {
    getTransaction,
    mintTransaction,
    refundTransaction,
    submitRequest,
    uploadIPFSFile,
  };
};

export default useBakClient;
