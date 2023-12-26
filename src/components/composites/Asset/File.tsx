import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, Image, Spin, Upload, UploadProps, message } from 'antd';
import useBakClient from 'client/bakrypt';
import React, { useEffect, useState } from 'react';

const UploadFile: React.FC<{
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

      const data = await uploadIPFSFile(file as File);

      setLoading(false);

      setUploadedFile(data);
      if (callback) callback(data);
      message.success(`${filename} file uploaded successfully`);
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
      />
    </Upload>
  );
};

export { UploadFile };

const File: React.FC<{ url?: string; alt?: string }> = ({ url, alt }) => {
  const [type, setType] = useState<string | undefined | null>();
  const fileUrl = url?.replace('ipfs://', 'https://gateway.bakrypt.io/ipfs/');

  useEffect(() => {
    setType(undefined);

    (async () => {
      try {
        if (!fileUrl) return;

        const fileBytesRes = await fetch(fileUrl);

        if (!fileBytesRes.ok) throw 'Unable to load file';

        setType(fileBytesRes.headers.get('content-type'));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  const renderFile = () => {
    if (type?.toLowerCase().trim().includes('image'))
      return <Image src={fileUrl} alt={alt} />;

    if (type?.toLowerCase().trim().includes('video'))
      return <video src={fileUrl} controls></video>;

    if (type?.toLowerCase().trim().includes('audio'))
      return <audio src={fileUrl} controls></audio>;

    return 'Unable to load file';
  };

  if (!type)
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );

  return <>{renderFile()}</>;
};

export default File;
