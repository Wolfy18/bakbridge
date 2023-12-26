import { UploadOutlined } from '@ant-design/icons';
import { Input, Image, Spin, Upload, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';

const UploadFile: React.FC<{
  callback?: (e: React.FormEvent<HTMLInputElement>) => void;
}> = ({ callback }) => {
  const props: UploadProps = {
    name: 'file',
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    action: (file: RcFile) => {
      console.log(file);
      return 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188';
    },

    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props} className="w-100">
      <Input
        type="text"
        maxLength={64}
        showCount={true}
        addonAfter={<UploadOutlined />}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          callback ? callback(e) : undefined
        }
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
