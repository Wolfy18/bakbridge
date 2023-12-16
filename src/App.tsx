import React, { PropsWithChildren } from 'react';
import './App.css';
import { Layout } from 'components/composites/Layout';
import { CollectionForm } from 'components/composites/Form';
import { FormProvider } from 'context/FormContext';
import { SessionProvider } from 'context/SessionContext';
import { Drawer as TransactionDrawer } from 'components/composites/Transaction';

const App: React.FC<PropsWithChildren & SessionContextProps> = (props) => {
  console.log(props, '< -- from app');
  return (
    <SessionProvider {...props}>
      <Layout>
        <FormProvider initialData={props.initialData}>
          <CollectionForm />
        </FormProvider>
        <TransactionDrawer />
      </Layout>
    </SessionProvider>
  );
};

export default App;
