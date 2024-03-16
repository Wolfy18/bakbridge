import React, { useRef, useState } from 'react';
import { Divider, Form, Space, Button, Input, InputRef } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FileUploader } from 'components/atoms/Input';
import { insertLineBreaks } from 'utils';

const FileInputPairItem: React.FC<{ name: string }> = ({ name }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
  };

  const handleUploadCallback = (file: AttachmentProps) => {
    if (ref.current !== null) {
      ref.current.removeEventListener('keydown', handleKeyDown);
      ref.current.addEventListener('keydown', handleKeyDown);
      ref.current.value = file.ipfs;
      ref.current.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      console.log(ref.current, 'over here!----');
    }
  };

  return (
    <div>
      {/* Input for file upload */}
      <FileUploader callback={handleUploadCallback} />
      {/* Hidden input */}
      <input name={name} ref={ref} type="text" defaultValue={''} />
    </div>
  );
};

const AssetForm: React.FC<{
  asset: AssetProps;
  setter: (e: AssetProps) => void;
}> = ({ asset, setter }) => {
  const [text, setText] = useState('');
  const assetNameRef = useRef<InputRef | null>(null);
  const [currentAsset, setCurrentAsset] = useState(asset);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    const formattedText = insertLineBreaks(inputValue);

    setText(formattedText);
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const key = inputElement.name as keyof AssetProps;

    const assetUpdate = { ...currentAsset };
    // Use square bracket notation to update the property dynamically
    Object.assign(assetUpdate, {
      [key]:
        key !== 'description'
          ? inputElement.value
          : insertLineBreaks(inputElement.value).split('\n'),
    });

    // Set asset name if name is set but no asset name
    if (!assetNameRef.current?.input?.value.length && assetUpdate.name) {
      Object.assign(assetUpdate, {
        asset_name: assetUpdate.name.substring(0, 32),
      });
    }

    Object.assign(assetUpdate, {
      asset_name: assetUpdate.asset_name?.replace(/[^a-zA-Z0-9]/g, ''),
    });

    setCurrentAsset(assetUpdate);
    setter(assetUpdate);
  };

  return (
    <Form
      layout="vertical"
      onChange={(e) => handleFormChange(e)}
      // initialValues={{ ...currentAsset }
    >
      <Form.Item label="Name" name="name" required>
        <Input name="name" type="text" maxLength={64} />
      </Form.Item>

      <Form.Item label="Asset Name" name="asset_name">
        <Input
          name="asset_name"
          ref={assetNameRef}
          type="text"
          maxLength={32}
          showCount={true}
        />
      </Form.Item>

      <Form.Item label="Number of tokens" name="amount" required>
        <Input name="amount" type="number" min={1} />
      </Form.Item>

      <Form.Item label="Cover Image" name="image" required>
        <FileInputPairItem name="image" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea
          name="description"
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleTextAreaChange(event)
          }
          value={text}
        />
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
                  <Input placeholder="Key" maxLength={64} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: 'Missing value' }]}
                >
                  <Input placeholder="Value" maxLength={64} />
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
              <Space key={key} className="mb-8" align="center">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Missing name' }]}
                  className="mb-0 col-span-2"
                >
                  <Input placeholder="Name" maxLength={64} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'src']}
                  rules={[{ required: true, message: 'Missing src' }]}
                  className="mb-0 col-span-2"
                >
                  <FileInputPairItem name="src" />
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
