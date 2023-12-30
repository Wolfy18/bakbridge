import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';

interface FormContextProps {
  assetCollection: AssetProps[];
  setAssetCollection: (collection: AssetProps[]) => void;
  openTxDrawer?: boolean;
  setOpenTxDrawer: (state: boolean) => void;
  transaction?: TransactionProps;
  setTransaction: (obj: TransactionProps) => void;
}

export const EmptyAsset = {
  blockchain: 'ada',
  name: '',
  image: '',
  description:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis doloremque harum sit soluta in officiis assumenda consequuntur? Molestiae tempora ducimus expedita consectetur. Porro possimus atque perferendis reprehenderit accusamus ipsum nulla!',
  amount: 1,
  attrs: {
    key: 'value',
    'another option': 'another value',
    colors: ['red', 'yellow', 'green', { top: 'blue', bottom: 'purple' }],
  },
  files: [
    {
      src: '',
      name: 'file 1',
    },
    {
      src: '',
      name: 'file 2',
    },
    {
      src: '',
      name: 'file 3',
    },
  ],
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<
  PropsWithChildren & { initialData?: string; showTransaction?: boolean }
> = ({ initialData, showTransaction, children }) => {
  const [assetCollection, setAssetCollection] = useState<AssetProps[]>(
    initialData && initialData.length ? JSON.parse(initialData) : [EmptyAsset]
  );

  const [openTxDrawer, setOpenTxDrawer] = useState<boolean | undefined>(
    showTransaction
  );

  const [transaction, setTransaction] = useState<TransactionProps | undefined>(
    undefined
  );
  console.log(assetCollection, ' ,-----');
  return (
    <FormContext.Provider
      value={{
        assetCollection,
        setAssetCollection,
        openTxDrawer,
        setOpenTxDrawer,
        transaction,
        setTransaction,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
