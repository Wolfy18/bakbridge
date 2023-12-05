import React from 'react';
import AssetForm from './Form';
import Card from './Card';

const Asset: React.FC<AssetProps> = (props) => {
  return (
    <div className="flex justify-center flex-col md:flex-row">
      <div className="flex-1">
        <Card {...props}></Card>
      </div>
      <div className="flex-1">
        <AssetForm />
      </div>
    </div>
  );
};

export default Asset;
