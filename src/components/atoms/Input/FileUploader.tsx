import React, { useState } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Input,
  Spin,
  Upload,
  UploadProps,
  message,
  Form as FormDS,
} from 'antd';
import useBakClient from 'client/bakrypt';
import { Rule } from 'antd/es/form';

const FileUploader: React.FC<{
  name: string | (string | number)[];
  initialValue?: string | null;
  status?: '' | 'error' | 'warning';
  error?: string;
  rules?: Rule[];
  className?: string;
  label?: string;
  prefixName?: string;
}> = ({
  status,
  name,
  initialValue,
  error,
  rules,
  className,
  label,
  prefixName = '',
}) => {
  const form = FormDS.useFormInstance();
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadIPFSFile } = useBakClient();
  const _name = Array.isArray(name) ? String(name[1]) : name;
  console.log(_name, ' <-------- ');
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customRequest: async ({ file, filename }) => {
      setLoading(true);
      try {
        const data = await uploadIPFSFile(file as File);
        console.log(form.getFieldValue(prefixName + _name), ' <---- before');
        form.setFieldValue(prefixName + _name, data.ipfs);
        console.log(form.getFieldValue(prefixName + _name), ' <---- after');
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
      <UploadOutlined />
    );
  };

  return (
    <Upload {...props} showUploadList={false}>
      <FormDS.Item
        name={name}
        required
        help={error}
        initialValue={initialValue}
        rules={rules}
        className={className}
        label={label}
        // shouldUpdate
      >
        <Input
          name={_name}
          type="text"
          readOnly
          addonAfter={renderSuffix()}
          status={status}
          placeholder="Upload file"
        />
      </FormDS.Item>
    </Upload>
  );
};

export default FileUploader;
