import React, { useRef, useState } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Input,
  Spin,
  Upload,
  UploadProps,
  message,
  Form as FormDS,
  InputRef,
} from 'antd';
import useBakClient from 'client/bakrypt';
import { Rule } from 'antd/es/form';
import { useFormikContext } from 'formik';

const FileUploader: React.FC<{
  name: string | (string | number)[];
  initialValue?: string | null;
  status?: '' | 'error' | 'warning';
  error?: string;
  rules?: Rule[];
  className?: string;
  label?: string;
}> = ({ status, name, initialValue, error, rules, className, label }) => {
  const inputRef = useRef<InputRef>(null);
  const form = FormDS.useFormInstance();
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadIPFSFile } = useBakClient();
  const _name = Array.isArray(name) ? String(name[1]) : name;

  const formikProps = useFormikContext();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    form.setFieldValue(_name, e.currentTarget.value);
    formikProps.setFieldValue(_name, e.currentTarget.value);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customRequest: async ({ file, filename }) => {
      setLoading(true);
      try {
        const data = await uploadIPFSFile(file as File);

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;

        nativeInputValueSetter?.call(inputRef.current?.input, data.ipfs);

        const inputEvent = new Event('change', { bubbles: true });
        inputRef.current?.input?.dispatchEvent(inputEvent);

        message.success(`${filename} uploaded successfully`);
      } catch (error) {
        message.error('Unable to upload file');
        console.error(error);
      }

      setLoading(false);
    },
  };

  const renderSuffix = () => {
    return loading ? (
      <Spin indicator={<LoadingOutlined size={6} spin />} />
    ) : (
      <Upload {...props} showUploadList={false} className="cursor-pointer">
        <UploadOutlined className="text-md" />
      </Upload>
    );
  };

  return (
    <FormDS.Item
      name={name}
      required
      help={error}
      initialValue={initialValue}
      rules={rules}
      className={className}
      label={label}
    >
      <Input
        ref={inputRef}
        name={_name}
        type="text"
        addonAfter={renderSuffix()}
        status={status}
        placeholder="Upload file"
        onChange={handleInputChange}
      />
    </FormDS.Item>
  );
};

export default FileUploader;
