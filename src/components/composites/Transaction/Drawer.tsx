import React from 'react';
import { Button, Drawer as DSDrawer, Popconfirm, Space, message } from 'antd';
import Invoice from './Invoice';
import useBakClient from 'client/bakrypt';
import { useFormContext } from 'context/FormContext';
import * as axios from 'axios';

const Drawer: React.FC = () => {
  const { refundTransaction, mintTransaction } = useBakClient();
  const { openTxDrawer, setOpenTxDrawer, transaction, setTransaction } =
    useFormContext();

  const onCloseDrawer: () => void = () => {
    setOpenTxDrawer(false);
  };

  if (!transaction) return <></>;

  const handleRefund = async () => {
    try {
      const tx = await refundTransaction(transaction.uuid);
      setTransaction(tx);
    } catch (error: unknown | axios.AxiosError) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.detail);
      } else {
        message.error('Unable to refund transaction. Try again.');
      }
    }
  };

  const handleMint = async () => {
    try {
      const tx = await mintTransaction(transaction.uuid);
      setTransaction(tx);
    } catch (error: unknown | axios.AxiosError) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.detail);
      } else {
        message.error('Unable to mint transaction. Try again.');
      }
    }
  };

  return (
    <DSDrawer
      title="Invoice"
      placement={'right'}
      size="large"
      className="!min-h-[100vh]"
      onClose={onCloseDrawer}
      open={openTxDrawer}
      extra={
        <Space>
          {!['confirmed', 'canceled'].includes(transaction.status) && (
            <>
              <Popconfirm
                title="Refund transaction"
                description="Are you sure to refund this transaction?"
                onConfirm={handleRefund}
                // onCancel={}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="default"
                  className="!border-red-400 text-red-500 hover:bg-red-500 hover:!text-white"
                >
                  Refund
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Mint transaction"
                description="Are you sure to mint this transaction?"
                onConfirm={handleMint}
                // onCancel={}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" className="bg-blue-500 text-white">
                  Mint
                </Button>
              </Popconfirm>
            </>
          )}

          <Button type="default" onClick={onCloseDrawer}>
            OK
          </Button>
        </Space>
      }
      style={{ lineHeight: 'normal' }}
    >
      <Invoice {...transaction} />
    </DSDrawer>
  );
};

export default Drawer;
