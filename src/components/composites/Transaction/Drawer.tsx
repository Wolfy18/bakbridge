import React, { useEffect, useState } from 'react';
import { Button, Drawer as DSDrawer, Space } from 'antd';
import { useSessionContext } from 'context/SessionContext';
import Invoice from './Invoice';
import useBakClient from 'client/bakrypt';

const Drawer: React.FC = () => {
  const { transactionUuid, showTransaction } = useSessionContext();
  const { refundTransaction, getTransaction, mintTransaction } = useBakClient();

  const [transaction, setTransaction] = useState<TransactionProps | undefined>(
    undefined
  );
  const [open, setOpen] = useState<boolean>(
    showTransaction ? showTransaction : true
  );
  const onCloseDrawer: () => void = () => {
    console.log('close drawer!');
    setOpen(false);
  };

  // fetch transaction information
  useEffect(() => {
    (async () => {
      if (!transactionUuid) return;
      try {
        const tx = await getTransaction(transactionUuid);
        setTransaction(tx.data);
      } catch (error) {
        alert('unable to load transaction');
      }
    })();
  }, [transactionUuid]);

  if (!transaction) return <>No transaction has been found</>;

  return (
    <div className="">
      <DSDrawer
        title="Invoice"
        placement={'right'}
        getContainer={false}
        size="large"
        onClose={onCloseDrawer}
        open={open}
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
