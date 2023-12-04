import React, { PropsWithChildren } from 'react';

import { Card as DSCard } from 'antd';

const { Meta } = DSCard;

const Card: React.FC<PropsWithChildren & AssetProps> = ({
  name,
  description,
  image,
  children,
}) => {
  return (
    <>
      <DSCard
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={image} />}
      >
        <Meta title={name} description={description} />
        {children}
      </DSCard>
    </>
  );
};

export default Card;
