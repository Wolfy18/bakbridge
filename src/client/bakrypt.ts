import client from './client';
import { AxiosResponse } from 'axios';

interface useBakClientProps {
  getTransaction: (
    uuid: string
  ) => Promise<AxiosResponse<TransactionProps, Error>>;
  mintTransaction: (
    uuid: string
  ) => Promise<AxiosResponse<TransactionProps, Error>>;
  refundTransaction: (
    uuid: string
  ) => Promise<AxiosResponse<TransactionProps, Error>>;
  submitRequest: (
    data: AssetProps[]
  ) => Promise<AxiosResponse<AssetProps[], Error>>;
}

const getTransaction = (uuid: string) => {
  return client.get(`transactions/${uuid}/`);
};

const mintTransaction = (uuid: string) => {
  return client.post(`transactions/${uuid}/mint/`);
};

const refundTransaction = (uuid: string) => {
  return client.post(`transactions/${uuid}/refund/`);
};

const submitRequest = (data: AssetProps[]) => {
  return client.post(`assets/`, data);
};

const useBakClient = (): useBakClientProps => {
  return {
    getTransaction,
    mintTransaction,
    refundTransaction,
    submitRequest,
  };
};

export default useBakClient;
