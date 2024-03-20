import React, { useRef, useState } from 'react';
import { Divider, Form as FormDS, Space, Button, Input, InputRef } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FileUploader } from 'components/atoms/Input';
import { insertLineBreaks } from 'utils';
import { Field, FieldProps } from 'formik';
import { useFormContext } from 'context/FormContext';

const AssetForm: React.FC<AssetProps & { index: number }> = ({
  name,
  index,
}) => {
  const [text, setText] = useState('');
  const assetNameRef = useRef<InputRef | null>(null);

  const { assetCollection, setAssetCollection } = useFormContext();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    const formattedText = insertLineBreaks(inputValue);

    setText(formattedText);
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = e.target as HTMLInputElement;
    console.log(e, ' <---- this is the current element');
    const key = inputElement.name.split('.')[1] as keyof AssetProps;

    const assetUpdate = { ...assetCollection[index] };
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

    const newcol = [...assetCollection];
    newcol[index] = assetUpdate;
    setAssetCollection(newcol);
  };

  return (
    <FormDS layout="vertical" onChangeCapture={(e) => handleFormChange(e)}>
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
          <FormDS.Item
            label="Token Name"
            name={field.name}
            required
            help={meta.error}
          >
            <Input
              {...field}
              type="text"
              maxLength={64}
              status={meta.error ? 'error' : undefined}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].asset_name`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            label="Index Name"
            name={field.name}
            required
            help={meta.error}
          >
            <Input
              {...field}
              type="text"
              maxLength={32}
              showCount={true}
              placeholder={name}
              status={meta.error ? 'error' : undefined}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].amount`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            label="Number of tokens"
            name={field.name}
            required
            help={meta.error}
          >
            <Input
              {...field}
              type="number"
              min={1}
              status={meta.error ? 'error' : undefined}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].image`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            label="Cover Image"
            name={field.name}
            required
            help={meta.error}
          >
            <FileUploader
              {...field}
              status={meta.error ? 'error' : undefined}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].description`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item label="Description" name={field.name} help={meta.error}>
            <Input.TextArea
              {...field}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleTextAreaChange(event)
              }
              value={text}
              status={meta.error ? 'error' : undefined}
            />
          </FormDS.Item>
        )}
      </Field>
      <Divider orientation="left">Attributes</Divider>

      <FormDS.List name={`asset[${index}].attrs`}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, idx) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <Field name={`${name}[${idx}].key`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      rules={[{ required: true, message: 'Missing key' }]}
                      help={meta.error}
                    >
                      <Input
                        placeholder="Key"
                        {...field}
                        maxLength={64}
                        status={meta.error ? 'error' : undefined}
                      />
                    </FormDS.Item>
                  )}
                </Field>

                <Field name={`${name}[${idx}].value`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      rules={[{ required: true, message: 'Missing value' }]}
                      help={meta.error}
                    >
                      <Input
                        {...field}
                        placeholder="Value"
                        maxLength={64}
                        status={meta.error ? 'error' : undefined}
                      />
                    </FormDS.Item>
                  )}
                </Field>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <FormDS.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add attribute
              </Button>
            </FormDS.Item>
          </>
        )}
      </FormDS.List>

      <Divider orientation="left">Files</Divider>
      <FormDS.List name={`asset[${index}].files`}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, fileIdx) => (
              <Space key={key} className="mb-8" align="center">
                <Field name={`asset[${index}].files[${fileIdx}].name`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      rules={[{ required: true, message: 'Missing name' }]}
                      className="mb-0 col-span-2"
                      help={meta.error}
                    >
                      <Input
                        {...field}
                        placeholder="Name"
                        maxLength={64}
                        status={meta.error ? 'error' : undefined}
                      />
                    </FormDS.Item>
                  )}
                </Field>
                <Field name={`asset[${index}].files[${fileIdx}].src`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      rules={[{ required: true, message: 'Missing source' }]}
                      className="mb-0 col-span-2"
                    >
                      <FileUploader
                        {...field}
                        status={meta.error ? 'error' : undefined}
                      />
                    </FormDS.Item>
                  )}
                </Field>
                <Field name={`asset[${index}].files[${fileIdx}].mediaType`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      className="mb-0 col-span-2"
                    >
                      <Input
                        {...field}
                        placeholder="media/type"
                        maxLength={64}
                        status={meta.error ? 'error' : undefined}
                      />
                    </FormDS.Item>
                  )}
                </Field>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <FormDS.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add File
              </Button>
            </FormDS.Item>
          </>
        )}
      </FormDS.List>
    </FormDS>
  );
};

export default AssetForm;
