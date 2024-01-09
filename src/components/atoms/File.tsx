import { Image, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';

const File: React.FC<{ url?: string; alt?: string }> = ({ url, alt }) => {
  const [type, setType] = useState<string | undefined | null>();
  const fileUrl = (
    url || 'ipfs://QmbuisJxUnYNbkYjSGLEbvHPzrwLLRNMep5YPRfuMZaWeD'
  ).replace('ipfs://', 'https://gateway.bakrypt.io/ipfs/');

  useEffect(() => {
    setType(undefined);

    (async () => {
      try {
        if (!fileUrl) return;

        const fileBytesRes = await fetch(fileUrl);

        if (!fileBytesRes.ok) throw Error;

        setType(fileBytesRes.headers.get('content-type'));
      } catch (error) {
        message.error('Unable to download file');
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

    return 'Unable to view file';
  };

  if (!type)
    return (
      <Spin tip="Loading" size="large" className="h-full flex items-center">
        <div className="content min-h-[250px]" />
      </Spin>
    );

  return <>{renderFile()}</>;
};

export default File;
