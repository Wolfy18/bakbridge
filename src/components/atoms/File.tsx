import { Image, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getContentType } from 'utils';

const File: React.FC<{ url?: string; alt?: string }> = ({ url, alt }) => {
  const [fileType, setType] = useState<string | undefined | null>();
  const fileUrl = (
    url || 'ipfs://QmbuisJxUnYNbkYjSGLEbvHPzrwLLRNMep5YPRfuMZaWeD'
  ).replace('ipfs://', 'https://gateway.bakrypt.io/ipfs/');

  useEffect(() => {
    setType(undefined);

    (async () => {
      try {
        if (!fileUrl) return;
        const type = await getContentType(fileUrl);

        if (type) {
          setType(type);
        }
      } catch (error) {
        message.error('Unable to download file');
      }
    })();
  }, [url]);

  useEffect(() => {}, [fileType]);

  const renderFile = () => {
    if (fileType?.toLowerCase().trim().includes('image'))
      return <Image src={fileUrl} alt={alt} />;

    if (fileType?.toLowerCase().trim().includes('video'))
      return <video src={fileUrl} controls></video>;

    if (fileType?.toLowerCase().trim().includes('audio'))
      return <audio src={fileUrl} controls></audio>;

    // TODO
    // if (fileType?.toLowerCase().trim().includes('pdf')) {
    //   return (
    //     <Viewer fileUrl={fileUrl} />
    //   );
    // }

    return 'Unable to view file';
  };

  if (!fileType)
    return (
      <Spin tip="Loading" size="large" className="h-full flex items-center">
        <div className="content min-h-[250px]" />
      </Spin>
    );

  return <>{renderFile()}</>;
};

export default File;
