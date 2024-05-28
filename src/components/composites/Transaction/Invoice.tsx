import React, { useEffect } from 'react';
import { Divider, Input, Form, QRCode, Alert, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { ShowPassword } from 'components/atoms/Input';
import dayjs from 'dayjs';

const icons: { [key: string]: [React.ReactNode, string] } = {
  confirmed: [<CheckCircleOutlined key={null} />, 'success'],
  error: [<CloseCircleOutlined key={null} />, 'error'],
  royalties: [<ExclamationCircleOutlined key={null} />, 'processing'],
  burning: [<ExclamationCircleOutlined key={null} />, 'processing'],
  rejected: [<CloseCircleOutlined key={null} />, 'error'],
  refund: [<ExclamationCircleOutlined key={null} />, 'warning'],
  processing: [<SyncOutlined spin key={null} />, 'processing'],
  'stand-by': [<ClockCircleOutlined key={null} />, 'processing'],
  canceled: [<MinusCircleOutlined key={null} />, 'default'],
  waiting: [<ClockCircleOutlined key={null} />, 'processing'],
  preauth: [<ClockCircleOutlined key={null} />, 'default'],
};

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
  const expires_on = dayjs(created_on).add(1, 'day');

  const [form] = Form.useForm();

  useEffect(() => {
    const processing_cost = status !== 'confirmed' ? estimated_cost : cost;
    form.setFieldsValue({
      status,
      status_description,
      processing_cost,
      cost,
      convenience_fee,
    });
  }, [
    status,
    status_description,
    estimated_cost,
    cost,
    estimated_cost,
    convenience_fee,
  ]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...{
          uuid,
          policy_id,
          status,
          processing_cost: status !== 'confirmed' ? estimated_cost : cost,
          convenience_fee,
          deposit_address,
          status_description,
          created_on,
          updated_on,
        },
      }}
    >
      <Form.Item label="Policy Id" name="policy_id">
        <Input readOnly />
      </Form.Item>
      <Form.Item label="Expires on" name="expires_on">
        <Input
          readOnly
          name="expires_on"
          defaultValue={expires_on.toISOString()}
        />
      </Form.Item>
      <Form.Item
        label={`${
          status !== 'confirmed'
            ? 'Minimun ADA to submit transaction'
            : 'ADA Spent'
        }`}
        name="processing_cost"
      >
        <Input readOnly />
      </Form.Item>
      <h3>Status</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex">
          <Tag
            icon={icons[status][0]}
            color={icons[status][1]}
            className="self-center"
          >
            {status}
          </Tag>
        </div>

        <Form.Item
          label=""
          name="status_description"
          className="col-span-2 mb-0"
        >
          <Input readOnly />
        </Form.Item>
      </div>

      {!['confirmed', 'canceled'].includes(status) && (
        <>
          <label>Deposit Address</label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4">
            <QRCode
              value={deposit_address}
              status={deposit_address ? 'active' : 'loading'}
            />
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
            copytoclipboard
          />

          <Divider />
        </>
      )}

      <Form.Item label="Transaction identifier" name="uuid">
        <Input readOnly name="uuid" />
      </Form.Item>
      <Form.Item label="Convenience fees" name="convenience_fee">
        <Input readOnly />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Created on" name="created_on">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Last update" name="updated_on">
          <Input readOnly />
        </Form.Item>
      </div>
    </Form>
  );
};

export default Invoice;
