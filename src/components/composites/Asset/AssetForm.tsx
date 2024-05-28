import React, { useEffect, useState } from 'react';
import { Divider, Form as FormDS, Space, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FileUploader } from 'components/atoms/Input';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useFormContext } from 'context/FormContext';
import { useForm } from 'antd/es/form/Form';

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
  const { assetCollection, setAssetCollection, transaction } = useFormContext();
  const [form] = useForm();
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const { values } = useFormikContext<{ asset: AssetProps[] }>();
  useEffect(() => setSubmitted(!!transaction), [transaction]);

  useEffect(() => {
    const props = {};

    for (const [key, val] of Object.entries(values.asset[index])) {
      console.log(key, val);
      Object.assign(props, {
        [`asset[${index}].${key}`]: val,
      });

      console.log(form.getFieldValue(`asset[${index}].${key}`));
    }

    console.log(props, '<-- props');

    const t = setTimeout(() => {
      form.setFieldsValue(props);
      console.log(form.getFieldsValue());
      setAssetCollection(values.asset);
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, [values]);

  return (
    <FormDS layout="vertical" form={form}>
      <Field name={`asset[${index}].blockchain`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            name={field.name}
            initialValue={blockchain}
            required
            className="hidden"
          >
            <Input
              {...field}
              maxLength={64}
              status={meta.error ? 'error' : undefined}
              disabled={isSubmitted}
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
              disabled={isSubmitted}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].asset_name`}>
        {({ field, meta }: FieldProps) => (
          <FormDS.Item
            label="Index Name"
            name={field.name}
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
              disabled={isSubmitted}
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
            initialValue={amount}
          >
            <Input
              {...field}
              type="number"
              min={1}
              status={meta.error ? 'error' : undefined}
              disabled={isSubmitted}
            />
          </FormDS.Item>
        )}
      </Field>

      <Field name={`asset[${index}].image`}>
        {({ field, meta }: FieldProps) => (
          <FileUploader
            {...field}
            status={meta.error ? 'error' : undefined}
            initialValue={image}
            error={meta.error}
            label="Cover Image"
          />
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
              status={meta.error ? 'error' : undefined}
              disabled={isSubmitted}
            />
          </FormDS.Item>
        )}
      </Field>

      {isSubmitted ? (
        attrs ? (
          <Divider orientation="left">Attributes</Divider>
        ) : null
      ) : (
        <Divider orientation="left">Attributes</Divider>
      )}

      <FormDS.List name={`asset[${index}].attrs`} initialValue={attrs}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, fileIdx) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <Field name={`asset[${index}].attrs[${fileIdx}].key`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={[name, field.name]}
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
                        disabled={isSubmitted}
                      />
                    </FormDS.Item>
                  )}
                </Field>
                <Field name={`asset[${index}].attrs[${fileIdx}].value`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={[name, field.name]}
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
                        disabled={isSubmitted}
                      />
                    </FormDS.Item>
                  )}
                </Field>

                <MinusCircleOutlined
                  onClick={() => {
                    remove(name);
                    const currentAsset = { ...assetCollection[index] };

                    attrs = currentAsset.attrs?.filter(
                      (obj, idx) => idx !== name
                    );
                    currentAsset.attrs = attrs;

                    const newcol = [...assetCollection];
                    newcol[index] = currentAsset;
                    setAssetCollection(newcol);
                  }}
                />
              </Space>
            ))}
            <FormDS.Item hidden={isSubmitted}>
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

      {isSubmitted ? (
        files ? (
          <Divider orientation="left">Files</Divider>
        ) : null
      ) : (
        <Divider orientation="left">Files</Divider>
      )}

      <FormDS.List name={`asset[${index}].files`} initialValue={files}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, fileIdx) => (
              <Space key={key} className="mb-8" align="center">
                <Field name={`asset[${index}].files[${fileIdx}].name`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={[name, field.name]}
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
                        disabled={isSubmitted}
                      />
                    </FormDS.Item>
                  )}
                </Field>
                <Field name={`asset[${index}].files[${fileIdx}].src`}>
                  {({ field, meta }: FieldProps) => (
                    <FileUploader
                      name={[name, field.name]}
                      status={meta.error ? 'error' : undefined}
                      initialValue={
                        files && files[fileIdx] ? files[fileIdx].src : null
                      }
                      error={meta.error}
                      rules={[{ required: true, message: 'Missing source' }]}
                      className="mb-0 col-span-2"
                    />
                  )}
                </Field>
                <Field name={`asset[${index}].files[${fileIdx}].mediaType`}>
                  {({ field, meta }: FieldProps) => (
                    <FormDS.Item
                      {...restField}
                      name={[name, field.name]}
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
                        disabled={isSubmitted}
                      />
                    </FormDS.Item>
                  )}
                </Field>
                <MinusCircleOutlined
                  onClick={() => {
                    remove(name);
                    const currentAsset = { ...assetCollection[index] };

                    files = currentAsset.files?.filter(
                      (obj, idx) => idx !== name
                    );
                    currentAsset.files = files;

                    const newcol = [...assetCollection];
                    newcol[index] = currentAsset;
                    setAssetCollection(newcol);
                  }}
                />
              </Space>
            ))}
            <FormDS.Item hidden={isSubmitted}>
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
