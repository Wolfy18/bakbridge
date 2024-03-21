import React, { useState } from 'react';
import { Divider, Form as FormDS, Space, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FileUploader } from 'components/atoms/Input';
import { insertLineBreaks } from 'utils';
import { Field, FieldProps } from 'formik';
import { useFormContext } from 'context/FormContext';

type NestedObject = {
  [key: string]: NestedObject | string | (NestedObject | string | AssetProps)[];
};

const AssetForm: React.FC<AssetProps & { index: number }> = ({
  blockchain,
  name,
  asset_name,
  image,
  amount,
  description,
  attrs,
  files,
  index,
}) => {
  const [text, setText] = useState('');
  const { assetCollection, setAssetCollection } = useFormContext();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    const formattedText = insertLineBreaks(inputValue);

    setText(formattedText);
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const properties = inputElement.name.split('.').slice(1);

    const assetUpdate = { ...assetCollection[index] };

    const recursiveProperties: (
      props: string[],
      obj?: NestedObject
    ) => NestedObject | undefined = (props, obj = {}) => {
      if (!props.length) return obj;

      const propertyKey = props.shift();

      if (propertyKey) {
        // Check if the propertyKey contains brackets indicating a list
        const match = propertyKey.match(/^(.+)\[(\d+)\]$/);
        if (match) {
          // Extract the list propertyKey and index from the match
          const listKey = match[1];
          const idx = parseInt(match[2], 10);
          // Initialize the list if it doesn't exist
          if (!Array.isArray(obj[listKey])) {
            obj[listKey] = [];
          }

          // Ensure the list element at the specified index is an object
          // @ts-expect-error the object can be nested object o string
          obj[listKey][idx] = obj[listKey][idx] || {};

          // RecursivePropertiesly call the function with the updated props and object
          // @ts-expect-error The object can be a nested object of string
          recursiveProperties(props, obj[listKey][idx]);
        } else {
          console.log(obj, propertyKey);
          obj[propertyKey] = inputElement.value;
        }
      }

      return obj;
    };

    // @ts-expect-error something
    const updatedProperty = recursiveProperties(properties, assetUpdate);

    const updated = { ...assetUpdate, ...updatedProperty };

    // set asset name if doesn't exists but name does
    if (!updated.asset_name) {
      updated['asset_name'] = updated.name.substring(0, 32);
    }

    // Only hexadecimal characters are allowed
    updated['asset_name'] = updated.asset_name.replace(/[^a-zA-Z0-9]/g, '');

    // insert line breaks for description
    if (updated.description) {
      updated['description'] = insertLineBreaks(updated.description);
    }

    // merge objects
    // console.log(assetUpdate, updated?.description?.split('\n'), ' ,-----');
    console.log(updated);
    const newcol = [...assetCollection];
    newcol[index] = updated;
    setAssetCollection(newcol);
  };

  return (
    <FormDS layout="vertical" onChangeCapture={(e) => handleFormChange(e)}>
      <Field name={`asset[${index}].blockchain`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            name={field.name}
            initialValue={blockchain}
            className="hidden"
          >
            <Input
              {...field}
              type="hidden"
              maxLength={64}
              status={meta.error ? 'error' : undefined}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].name`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            label="Token Name"
            name={field.name}
            required
            help={meta.error}
            initialValue={name}
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
            initialValue={asset_name || name}
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
            initialValue={Number(amount)}
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
            initialValue={image}
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
          <FormDS.Item
            label="Description"
            name={field.name}
            help={meta.error}
            initialValue={description}
          >
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

      <FormDS.List name={`asset[${index}].attrs`} initialValue={attrs}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, fileIdx) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <Field name={`asset[${index}].attrs[${fileIdx}].key`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      rules={[{ required: true, message: 'Missing key' }]}
                      help={meta.error}
                      initialValue={
                        attrs && attrs[fileIdx] ? attrs[fileIdx].key : null
                      }
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
                <Field name={`asset[${index}].attrs[${fileIdx}].value`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={field.name}
                      rules={[{ required: true, message: 'Missing value' }]}
                      help={meta.error}
                      initialValue={
                        attrs && attrs[fileIdx] ? attrs[fileIdx].value : null
                      }
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
      <FormDS.List name={`asset[${index}].files`} initialValue={files}>
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
                      initialValue={
                        files && files[fileIdx] ? files[fileIdx].name : null
                      }
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
                      initialValue={
                        files && files[fileIdx] ? files[fileIdx].src : null
                      }
                      help={meta.error}
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
                      initialValue={
                        files && files[fileIdx]
                          ? files[fileIdx].mediaType
                          : null
                      }
                      help={meta.error}
                    >
                      <Input
                        {...field}
                        placeholder="media/type"
                        maxLength={64}
                        type="text"
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
