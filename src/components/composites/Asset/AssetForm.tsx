import React, { useEffect, useState } from 'react';
import { Divider, Form as FormDS, Space, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FileUploader } from 'components/atoms/Input';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useFormContext } from 'context/FormContext';
import { useForm } from 'antd/lib/form/Form';

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
  const { values, setValues } = useFormikContext<{ asset: AssetProps[] }>();
  useEffect(() => setSubmitted(!!transaction), [transaction]);

  useEffect(() => {
    const props = {};

    if (values.asset && values.asset[index]) {
      for (const [key, val] of Object.entries(values.asset[index])) {
        let value = val;
        if (key === 'attrs') {
          value = val?.map(
            (obj: { key: string; value: string }, idx: string) => {
              return {
                [`asset[${index}].${key}[${idx}].key`]: obj.key,
                [`asset[${index}].${key}[${idx}].value`]: obj.value,
              };
            }
          );
        }
        if (key === 'files') {
          value = val?.map(
            (
              obj: { src: string; name: string; mediaType: string },
              idx: string
            ) => {
              return {
                [`asset[${index}].${key}[${idx}].src`]: obj.src,
                [`asset[${index}].${key}[${idx}].name`]: obj.name,
                [`asset[${index}].${key}[${idx}].mediaType`]: obj.mediaType,
              };
            }
          );
        }
        Object.assign(props, {
          [`asset[${index}].${key}`]: value,
        });
      }
    }

    const t = setTimeout(() => {
      form.setFieldsValue(props);
      setAssetCollection(values.asset);
    }, 300);

    return () => {
      clearTimeout(t);
    };
  }, [values]);

  const handleRemoveAttr = (attrIdx: number, index: number) => {
    const currentAsset = { ...values.asset[index] };

    attrs = currentAsset.attrs?.filter((obj, idx) => idx !== attrIdx);
    currentAsset.attrs = attrs;

    const newValues = { ...values };
    newValues.asset[index] = currentAsset;
    setValues(newValues);
  };

  const handleRemoveFile = (fileIdx: number, index: number) => {
    const currentAsset = { ...assetCollection[index] };

    files = currentAsset.files?.filter((obj, idx) => idx !== fileIdx);
    currentAsset.files = files;

    const newValues = { ...values };
    newValues.asset[index] = currentAsset;
    setValues(newValues);
  };

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
            disabled={isSubmitted}
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
        attrs && Object.keys(attrs).length ? (
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

                {!transaction && (
                  <MinusCircleOutlined
                    onClick={() => {
                      handleRemoveAttr(name, index);
                      remove(name);
                    }}
                  />
                )}
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
        files && files.length ? (
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
                      disabled={isSubmitted}
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

                {!transaction && (
                  <MinusCircleOutlined
                    onClick={() => {
                      handleRemoveFile(name, index);
                      remove(name);
                    }}
                  />
                )}
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
