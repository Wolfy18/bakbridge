import React from 'react';
import { Divider, Switch, Input, Form, QRCode, Alert } from 'antd';
import { ShowPassword } from 'components/atoms/Input';

const Invoice: React.FC<TransactionProps> = ({
  uuid,
  policy_id,
  status,
  estimated_cost,
  cost,
  convenience_fee,
  deposit_address,
  status_description,
  created_on,
  updated_on,
}) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Policy Id" name="policy_id">
        <Input readOnly name="policy_id" defaultValue={policy_id} />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label={`${
            status !== 'confirmed' ? 'Min. Processing cost' : 'Final cost'
          }`}
          name="processing_cost"
        >
          <Input
            readOnly
            name="processing_cost"
            defaultValue={status !== 'confirmed' ? estimated_cost : cost}
          />
        </Form.Item>
        <Form.Item label="Convenience fees" name="fees">
          <Input readOnly name="fees" defaultValue={convenience_fee} />
        </Form.Item>
      </div>

      {!['confirmed', 'canceled'].includes(status) && (
        <>
          <label>Deposit Address</label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4">
            <QRCode value={deposit_address} status="loading" />
            <Alert
              className="col-span-2"
              message="DO NOT TRANSFER FUNDS FROM AN EXCHANGE!"
              description="We will send all tokens and change to the payor's address; meaning that the payment must be done from a wallet that you can control and its capable of manage native tokens on Cardano like Nami, Flint, Yoroi, Daedalus or Eternl"
              type="warning"
              showIcon
            />
          </div>
          <ShowPassword
            readOnly
            name="deposit_address"
            value={deposit_address}
          />

          <Divider />
        </>
      )}

      <Form.Item label="Transaction Identifier" name="uuid">
        <Input readOnly name="uuid" defaultValue={uuid} />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Created" name="created_on">
          <Input readOnly name="created_on" defaultValue={created_on} />
        </Form.Item>
        <Form.Item label="Updated" name="updated_on">
          <Input readOnly name="updated_on" defaultValue={updated_on} />
        </Form.Item>
      </div>

      <Form.Item label="Status Description" name="status_description">
        <Input
          readOnly
          name="status_description"
          defaultValue={status_description}
        />
      </Form.Item>

      {!['confirmed', 'canceled'].includes(status) && (
        <>
          <Divider orientation="left">Process Automatically</Divider>
          <Switch checkedChildren="On" unCheckedChildren="Off" />
        </>
      )}
    </Form>
  );
};

export default Invoice;
