import React, { useEffect, useState } from 'react';

const File: React.FC<{ url: string; alt?: string }> = ({ url = '', alt }) => {
  const [type, setType] = useState<string | undefined | null>();
  const fileUrl = url.replace('ipfs://', 'https://gateway.bakrypt.io/ipfs/');

  useEffect(() => {
    setType(undefined);

    (async () => {
      try {
        const fileBytesRes = await fetch(fileUrl);

        if (!fileBytesRes.ok) throw 'Unable to load file';

        setType(fileBytesRes.headers.get('content-type'));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  const renderFile = () => {
    console.log(type, ' <-------');
    if (type?.toLowerCase().trim().includes('image'))
      return <img src={fileUrl} alt={alt} />;

    if (type?.toLowerCase().trim().includes('video'))
      return <video src={fileUrl} controls></video>;

    if (type?.toLowerCase().trim().includes('audio'))
      return <audio src={fileUrl} controls></audio>;

    return 'Unable to load file';
  };

  if (!type) return <>Loading file....</>;

  return <>{renderFile()}</>;
};

export default File;
