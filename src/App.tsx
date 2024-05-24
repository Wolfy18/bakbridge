import React, { PropsWithChildren } from 'react';

import { Layout } from 'components/composites/Layout';
import { CollectionForm } from 'components/composites/CollectionForm';
import { FormProvider } from 'context/FormContext';
import { SessionProvider } from 'context/SessionContext';
import { Drawer as TransactionDrawer } from 'components/composites/Transaction';

import './App.css';
import { ConfigProvider } from 'antd';

const App: React.FC<PropsWithChildren & SessionContextProps> = (props) => {
  return (
    <ConfigProvider componentSize="middle">
      <SessionProvider {...props}>
        <Layout>
          <FormProvider
            initialData={props.initialData}
            showTransaction={props.showTransaction}
          >
            <CollectionForm />
            <TransactionDrawer />
          </FormProvider>
        </Layout>
      </SessionProvider>
    </ConfigProvider>
  );
};

export default App;
