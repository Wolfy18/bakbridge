import React from 'react';
import AssetForm from './AssetForm';
import Card from './Card';

const Asset: React.FC<AssetProps> = (props) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="col-span-1">
        <Card {...props}></Card>
      </div>
      <div className="col-span-1">
        <AssetForm />
      </div>
    </div>
  );
};

export default Asset;
