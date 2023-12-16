import React, { useEffect, useState } from 'react';
import {
  Divider,
  Button,
  Drawer as DSDrawer,
  Space,
  Switch,
  Input,
  Form,
} from 'antd';
import { useSessionContext } from 'context/SessionContext';
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
      const tx = await getTransaction(transactionUuid);
      setTransaction(tx.data);
    })();
  }, [transactionUuid]);

  if (!transaction) return <>No transaction has been found</>;

  return (
    <div className="">
      <DSDrawer
        title="Invoice Details"
        placement={'bottom'}
        getContainer={false}
        width={500}
        onClose={onCloseDrawer}
        open={open}
        extra={
          <Space>
            <Button
              type="default"
              className="bg-info text-white"
              onClick={() => mintTransaction(transaction.uuid)}
            >
              Mint Transaction
            </Button>
            <Button
              type="default"
              className="bg-danger text-white"
              onClick={() => refundTransaction(transaction.uuid)}
            >
              Refund Transaction
            </Button>
            <Button type="default" onClick={onCloseDrawer}>
              OK
            </Button>
          </Space>
        }
        style={{ lineHeight: 'normal' }}
      >
        <Form layout="vertical">
          <Form.Item label="Policy Id" name="policy_id">
            <Input
              readOnly
              name="policy_id"
              defaultValue={transaction.policy_id}
            />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item label="Processing Cost" name="processing_cost">
              <Input
                readOnly
                name="processing_cost"
                defaultValue={
                  transaction.status !== 'confirmed'
                    ? transaction.estimated_cost
                    : transaction.cost
                }
              />
            </Form.Item>
            <Form.Item label="Convenience fees" name="fees">
              <Input
                readOnly
                name="fees"
                defaultValue={transaction.convenience_fee}
              />
            </Form.Item>
          </div>

          <Switch checkedChildren="On" unCheckedChildren="Off" />
          <Divider orientation="left">Process Automatically</Divider>
          <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
        </Form>
      </DSDrawer>
    </div>
  );
};

export default Drawer;
