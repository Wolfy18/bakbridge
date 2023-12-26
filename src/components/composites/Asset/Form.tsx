import React from 'react';
import { Divider, Form, Space, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from './File';

const AssetForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Name" name="name" required>
        <Input name="name" type="text" showCount={true} maxLength={64} />
      </Form.Item>

      <Form.Item label="Asset Name" name="asset_name">
        <Input name="asset_name" type="text" showCount={true} maxLength={32} />
      </Form.Item>

      <Form.Item label="Number of tokens" name="amount" required>
        <Input name="amount" type="number" min={1} />
      </Form.Item>

      <Form.Item label="Cover Image" name="image" required>
        <Input name="image" type="hidden" />
        <UploadFile />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea name="description" />
      </Form.Item>

      <Divider orientation="left">Attributes</Divider>

      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'key']}
                  rules={[{ required: true, message: 'Missing key' }]}
                >
                  <Input placeholder="Key" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: 'Missing value' }]}
                >
                  <Input placeholder="Value" />
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
                className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center mb-8"
                align="center"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Missing name' }]}
                  className="mb-0"
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'src']}
                  rules={[{ required: true, message: 'Missing src' }]}
                  className="mb-0"
                >
                  <UploadFile />
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

export default AssetForm;
