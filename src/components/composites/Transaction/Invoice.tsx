import React from 'react';
import { Divider, Switch, Input, Form } from 'antd';

const Invoice: React.FC<TransactionProps> = ({
  policy_id,
  status,
  estimated_cost,
  cost,
  convenience_fee,
}: TransactionProps) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Policy Id" name="policy_id">
        <Input readOnly name="policy_id" defaultValue={policy_id} />
      </Form.Item>
      <div className="flex justify-between">
        <Form.Item label="Processing Cost" name="processing_cost">
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
          <Divider orientation="left">Process Automatically</Divider>
          <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
        </>
      )}
    </Form>
  );
};

export default Invoice;
