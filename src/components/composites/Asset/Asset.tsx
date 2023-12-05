import { Divider, Form, Space, Button, Input } from 'antd';
import { Card } from 'components/atoms/Card';
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Form as FormikForm } from 'formik';

const AssetForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Asset Name" name="asset_name">
        <Input name="asset_name" type="text" />
      </Form.Item>

      <Form.Item label="Name" name="name">
        <Input name="name" type="text" />
      </Form.Item>

      <Form.Item label="Cover Image" name="image">
        <Input name="image" type="text" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea name="description" />
      </Form.Item>

      <Divider orientation="left">Attributes</Divider>

      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add attribute
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Divider orientation="left">Files</Divider>
      <Form.List name="files">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add File
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

const Asset: React.FC<AssetProps> = (props) => {
  return (
    <div className="flex justify-center flex-col md:flex-row">
      <div className="flex-1">
        <Card {...props}></Card>
      </div>
      <div className="flex-1">
        <AssetForm />
      </div>
    </div>
  );
};

export default Asset;
