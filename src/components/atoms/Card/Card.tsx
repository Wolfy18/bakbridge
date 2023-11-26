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
        <Meta
          title="Europe Street beat"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quaerat velit beatae enim dignissimos eum tempore ipsa perferendis suscipit nobis alias aperiam cum similique, totam numquam minus quibusdam nulla dolor."
        />
        {children}
      </DSCard>
    </>
  );
};

export default Card;
