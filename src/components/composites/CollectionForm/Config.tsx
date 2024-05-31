import React, { FormEvent, useState } from 'react';
import { Divider, Form, Input, Switch } from 'antd';
import { useFormContext } from 'context/FormContext';

const Config: React.FC = () => {
  const { transaction, assetCollection, setAssetCollection } = useFormContext();
  const [state, setState] = useState<{ royalties: boolean }>({
    royalties: !!transaction?.has_royalties,
  });
  const [royalties, setRoyalties] = useState<{
    royalties?: string;
    royalties_rate?: string;
  }>({
    royalties: transaction?.royalties,
    royalties_rate: transaction?.royalties_rate,
  });

  const handleRoyalties = (checked: boolean) => {
    let first = [...assetCollection].shift();
    if (!first) return;

    if (checked) {
      first = { ...first, ...royalties };

      setState({ ...state, royalties: true });
    } else {
      first = { ...first, royalties: undefined, royalties_rate: undefined };

      setState({ ...state, royalties: false });
    }
    const newCol = assetCollection;
    newCol[0] = first;

    setAssetCollection(newCol);
  };

  return (
    <Form
      layout="vertical"
      disabled={!!transaction}
      onChange={(e: FormEvent<HTMLFormElement>) => {
        const inputE = e.target as HTMLInputElement;
        const roy = {
          ...royalties,
          [inputE.name]: inputE.value,
        };
        setRoyalties(roy);
        handleRoyalties(false);
        setState({
          ...state,
          royalties: false,
        });
      }}
    >
      <p>Setup custom configurations for this transaction</p>
      <Divider orientation="left">Royalties</Divider>
      <Form.Item
        label="Percentage %"
        initialValue={transaction?.royalties_rate}
        name="royalties_rate"
      >
        <Input name="royalties_rate" type="number" min={0.0} max={100} />
      </Form.Item>
      <Form.Item
        label="Wallet Address"
        name="royalties"
        initialValue={transaction?.royalties}
      >
        <Input name="royalties" />
      </Form.Item>
      <p>On/Off</p>
      <Switch
        checked={state.royalties}
        checkedChildren="On"
        unCheckedChildren="Off"
        onChange={handleRoyalties}
      />
    </Form>
  );
};

export default Config;
