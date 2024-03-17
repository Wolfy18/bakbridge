import React, { useRef, useState } from 'react';
import { Divider, Form as FormAntd, Space, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FileUploader } from 'components/atoms/Input';
import { insertLineBreaks } from 'utils';
import { Field, FieldProps } from 'formik';

const FileInputPairItem: React.FC<{
  name: string;
  status?: '' | 'error' | 'warning';
}> = ({ name, status }) => {
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
      <FileUploader callback={handleUploadCallback} status={status} />
      {/* Hidden input */}
      <input name={name} ref={ref} type="hidden" defaultValue={''} />
    </div>
  );
};

const AssetForm: React.FC<AssetProps & { index: number }> = ({
  name,
  index,
}) => {
  const [text, setText] = useState('');
  // const assetNameRef = useRef<InputRef | null>(null);
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    const formattedText = insertLineBreaks(inputValue);

    setText(formattedText);
  };
  return (
    <FormAntd
      layout="vertical"
      // onChange={(e) => handleFormChange(e, errors, touched)}
    >
      <Field name={`asset[${index}].blockchain`}>
        {({ field, meta }: FieldProps) => (
          <Input
            {...field}
            type="hidden"
            maxLength={64}
            status={meta.error ? 'error' : undefined}
          />
        )}
      </Field>

      <Field name={`asset[${index}].name`}>
        {({ field, meta }: FieldProps) => (
          <FormAntd.Item label="Token Name" name={field.name} required>
            <Input
              {...field}
              type="text"
              maxLength={64}
              status={meta.error ? 'error' : undefined}
            />
          </FormAntd.Item>
        )}
      </Field>

      <Field name={`asset[${index}].asset_name`}>
        {({ field, meta }: FieldProps) => (
          <FormAntd.Item label="Index Name" name={field.name} required>
            <Input
              {...field}
              type="text"
              maxLength={32}
              showCount={true}
              placeholder={name}
              status={meta.error ? 'error' : undefined}
            />
          </FormAntd.Item>
        )}
      </Field>

      <Field name={`asset[${index}].amount`}>
        {({ field, meta }: FieldProps) => (
          <FormAntd.Item label="Number of tokens" {...field} required>
            <Input
              {...field}
              type="number"
              min={1}
              status={meta.error ? 'error' : undefined}
            />
          </FormAntd.Item>
        )}
      </Field>

      <Field name={`asset[${index}].image`}>
        {({ field, meta }: FieldProps) => (
          <FormAntd.Item label="Cover Image" {...field} required>
            <FileInputPairItem
              {...field}
              status={meta.error ? 'error' : undefined}
            />
          </FormAntd.Item>
        )}
      </Field>

      <Field name={`asset[${index}].description`}>
        {({ field, meta }: FieldProps) => (
          <FormAntd.Item label="Description" {...field}>
            <Input.TextArea
              {...field}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleTextAreaChange(event)
              }
              value={text}
              status={meta.error ? 'error' : undefined}
            />
          </FormAntd.Item>
        )}
      </Field>
      <Divider orientation="left">Attributes</Divider>

      <FormAntd.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <FormAntd.Item
                  {...restField}
                  name={[name, 'key']}
                  rules={[{ required: true, message: 'Missing key' }]}
                >
                  <Input placeholder="Key" maxLength={64} />
                </FormAntd.Item>
                <FormAntd.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: 'Missing value' }]}
                >
                  <Input placeholder="Value" maxLength={64} />
                </FormAntd.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <FormAntd.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add attribute
              </Button>
            </FormAntd.Item>
          </>
        )}
      </FormAntd.List>

      <Divider orientation="left">Files</Divider>
      <FormAntd.List name="files">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="mb-8" align="center">
                <FormAntd.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Missing name' }]}
                  className="mb-0 col-span-2"
                >
                  <Input placeholder="Name" maxLength={64} />
                </FormAntd.Item>
                <FormAntd.Item
                  {...restField}
                  name={[name, 'src']}
                  rules={[{ required: true, message: 'Missing src' }]}
                  className="mb-0 col-span-2"
                >
                  <FileInputPairItem name="src" />
                </FormAntd.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <FormAntd.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add File
              </Button>
            </FormAntd.Item>
          </>
        )}
      </FormAntd.List>
    </FormAntd>
  );
};

export default AssetForm;
