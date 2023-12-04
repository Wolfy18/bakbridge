import React, { useState } from 'react';
import './App.css';
import { Layout } from 'components/composites/Layout';
import { CollectionForm } from 'components/composites/Form';
// import { Button, notification, NotificationArgsProps, Space } from 'antd';
import FormContext from 'context/FormContext';
import SessionContext from 'context/SessionContext';
import { Drawer as TransactionDrawer } from 'components/composites/Transaction';

const App: React.FC<SessionContextProps> = (props) => {
  const [assetCollection, setAssetCollection] = useState<AssetProps[]>(
    props.initialData && props.initialData.length
      ? JSON.parse(props.initialData)
      : [
          {
            blockchain: 'ada',
            name: `Default No initial Data`,
            image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            amount: 1,
          },
        ]
  );

  return (
    <SessionContext.Provider value={{ ...props }}>
      <Layout>
        <FormContext.Provider value={{ assetCollection, setAssetCollection }}>
          <CollectionForm />
        </FormContext.Provider>
      </Layout>
      <TransactionDrawer />
    </SessionContext.Provider>
  );
};

export default App;
