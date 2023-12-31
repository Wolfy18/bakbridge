import React from 'react';
import AssetForm from './AssetForm';
import Card from './Card';
import { Badge } from 'antd';

const Asset: React.FC<AssetProps & { index: number }> = (props) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="col-span-1">
        <Badge.Ribbon
          text={props.amount > 1 ? 'Fungible Token' : 'NFT'}
          color={props.amount > 1 ? 'yellow' : 'blue'}
        >
          <Card index={props.index}></Card>
        </Badge.Ribbon>
      </div>
      <div className="col-span-1">
        <AssetForm index={props.index} />
      </div>
    </div>
  );
};

export default Asset;
