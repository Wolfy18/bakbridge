import React from 'react';
import AssetForm from './AssetForm';
import Card from './Card';
import { Badge } from 'antd';

const Asset: React.FC<AssetProps> = (props) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="col-span-1">
        <Badge.Ribbon
          text={props.amount > 1 ? 'Fungible Token' : 'NFT'}
          color={props.amount > 1 ? 'yellow' : 'blue'}
        >
          <Card {...props}></Card>
        </Badge.Ribbon>
      </div>
      <div className="col-span-1">
        <AssetForm />
      </div>
    </div>
  );
};

export default Asset;
