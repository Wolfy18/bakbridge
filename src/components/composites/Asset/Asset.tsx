import React, { useEffect, useState } from 'react';
import AssetForm from './AssetForm';
import Card from './Card';
import { Badge } from 'antd';
import { useFormContext } from 'context/FormContext';

const Asset: React.FC<{ props: AssetProps; idx: number }> = ({
  props,
  idx,
}) => {
  const [asset, setAsset] = useState<AssetProps>(props);
  const { assetCollection, setAssetCollection } = useFormContext();

  useEffect(() => {
    const t = setTimeout(() => {
      const collection = [...assetCollection];
      collection[idx] = asset;
      setAssetCollection(collection);
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [asset]);

  useEffect(() => {
    console.log(asset, '< ======');
  }, [asset]);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="col-span-1">
        <Badge.Ribbon
          text={asset.amount > 1 ? 'Fungible Token' : 'NFT'}
          color={asset.amount > 1 ? 'yellow' : 'blue'}
        >
          <Card {...asset}></Card>
        </Badge.Ribbon>
      </div>
      <div className="col-span-1">
        <AssetForm asset={asset} setter={setAsset} />
      </div>
    </div>
  );
};

export default Asset;
