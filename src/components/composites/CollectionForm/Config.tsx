import React from 'react';
import { Divider, Form, Input, Switch } from 'antd';
import { useFormContext } from 'context/FormContext';

const Config: React.FC = () => {
  const { transaction } = useFormContext();

  return (
    <Form layout="vertical" disabled={!!transaction}>
      <p>Setup custom configurations for this transaction, like royalties!</p>
      <Divider orientation="left">Royalties</Divider>
      <Form.Item label="Percentage %" name="percentage">
        <Input
          name="percentage"
          type="number"
          defaultValue={transaction?.royalties_rate}
          min={0.0}
          max={100}
        />
      </Form.Item>
      <Form.Item label="Wallet Address" name="wallet_address">
        <Input name="wallet_address" defaultValue={transaction?.royalties} />
      </Form.Item>
      <p>On/Off</p>
      <Switch
        defaultChecked={transaction?.has_royalties}
        checkedChildren="On"
        unCheckedChildren="Off"
      />
    </Form>
  );
};

export default Config;
