import React from 'react';
import { Button, Drawer as DSDrawer, Space } from 'antd';
import Invoice from './Invoice';
import useBakClient from 'client/bakrypt';
import { useFormContext } from 'context/FormContext';

const Drawer: React.FC = () => {
  const { refundTransaction, mintTransaction } = useBakClient();
  const { openTxDrawer, setOpenTxDrawer, transaction } = useFormContext();

  const onCloseDrawer: () => void = () => {
    console.log('close drawer!');
    setOpenTxDrawer(false);
  };

  if (!transaction) return <></>;

  return (
    <div className="">
      <DSDrawer
        title="Invoice"
        placement={'right'}
        getContainer={false}
        size="large"
        onClose={onCloseDrawer}
        open={openTxDrawer}
        extra={
          <Space>
            <Button
              type="default"
              className="!border-red-400 text-red-500 hover:bg-red-500 hover:!text-white"
              onClick={() => refundTransaction(transaction.uuid)}
            >
              Refund
            </Button>

            <Button
              type="primary"
              className="bg-blue-500 text-white"
              onClick={() => mintTransaction(transaction.uuid)}
            >
              Mint
            </Button>

            <Button type="default" onClick={onCloseDrawer}>
              OK
            </Button>
          </Space>
        }
        style={{ lineHeight: 'normal' }}
      >
        <Invoice {...transaction} />
      </DSDrawer>
    </div>
  );
};

export default Drawer;
