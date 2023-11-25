import React, { PropsWithChildren } from 'react';

import { Card as DSCard, CardProps } from 'antd';

const { Meta } = DSCard;

const Card: React.FC<PropsWithChildren & CardProps> = ({ children }) => {
  return (
    <>
      <DSCard
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
        {children}
      </DSCard>
    </>
  );
};

export default Card;
