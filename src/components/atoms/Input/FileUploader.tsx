import React, { useState } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, Spin, Upload, UploadProps, message } from 'antd';
import useBakClient from 'client/bakrypt';

const FileUploader: React.FC<{
  callback?: (data: AttachmentProps) => void;
}> = ({ callback }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadIPFSFile } = useBakClient();
  const [uploadedFile, setUploadedFile] = useState<
    AttachmentProps | undefined
  >();

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customRequest: async ({ file, filename }) => {
      setLoading(true);
      try {
        const data = await uploadIPFSFile(file as File);

        setUploadedFile(data);
        if (callback) callback(data);
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
      <Spin indicator={<LoadingOutlined size={8} spin />} />
    ) : (
      ''
    );
  };

  return (
    <Upload {...props} showUploadList={false}>
      <Input
        type="text"
        maxLength={64}
        addonAfter={<UploadOutlined />}
        suffix={renderSuffix()}
        readOnly
        value={uploadedFile?.ipfs}
        placeholder="Upload to IPFS"
      />
    </Upload>
  );
};

export default FileUploader;
