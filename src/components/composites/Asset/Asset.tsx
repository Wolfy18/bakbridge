import React from 'react';
import AssetForm from './AssetForm';
import Card from './Card';
import { Badge } from 'antd';

const Asset: React.FC<{ props: AssetProps; idx: number }> = ({
  props: {
    blockchain,
    name,
    asset_name,
    image,
    amount,
    description,
    attrs,
    files,
  },
  idx,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="col-span-1">
        <Badge.Ribbon
          text={amount > 1 ? 'Fungible Token' : 'NFT'}
          color={amount > 1 ? 'yellow' : 'blue'}
        >
          <Card
            {...{
              blockchain,
              name,
              asset_name,
              image,
              amount,
              description,
              attrs,
              files,
            }}
          ></Card>
        </Badge.Ribbon>
      </div>
      <div className="col-span-1">
        <AssetForm
          {...{
            blockchain,
            name,
            asset_name,
            image,
            amount,
            description,
            attrs,
            files,
          }}
          index={idx}
        />
      </div>
    </div>
  );
};

export default Asset;
