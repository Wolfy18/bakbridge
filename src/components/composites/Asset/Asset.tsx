import React, { useEffect, useState } from 'react';
import AssetForm from './AssetForm';
import Card from './Card';
import { Badge } from 'antd';
import { useFormikContext } from 'formik';
import { EmptyAsset } from 'context/FormContext';
import { useSessionContext } from 'context/SessionContext';

const Asset: React.FC<{ props: AssetProps; idx: number }> = ({ idx }) => {
  const { values } = useFormikContext<{ asset: AssetProps[] }>();
  const { disableForm } = useSessionContext();
  const [showForm, setShowForm] = useState<boolean>(true);
  const [asset, setAsset] = useState<AssetProps>(EmptyAsset);

  useEffect(() => {
    if (!values.asset[idx]) return;
    setAsset(values.asset[idx]);
    if (disableForm) setShowForm(false);
  }, [values, disableForm]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className={`col-span-${showForm ? '1' : '2'}`}>
        <Badge.Ribbon
          text={asset.amount > 1 ? 'Fungible Token' : 'NFT'}
          color={asset.amount > 1 ? 'yellow' : 'blue'}
        >
          <Card {...asset}></Card>
        </Badge.Ribbon>
      </div>
      {showForm ? (
        <div className="col-span-1">
          <AssetForm {...asset} index={idx} />
        </div>
      ) : null}
    </div>
  );
};

export default Asset;
