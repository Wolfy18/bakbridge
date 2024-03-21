import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
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
  amount: 1,
  // description: '',
  // attrs: [],
  // files: [],
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
  const [assetCollection, setAssetCollection] = useState<AssetProps[]>([
    EmptyAsset,
  ]);

  const [openTxDrawer, setOpenTxDrawer] = useState<boolean | undefined>(
    showTransaction
  );

  const [transaction, setTransaction] = useState<TransactionProps | undefined>(
    undefined
  );

  useEffect(() => {
    let data: IntakeAssetProps[] | undefined;
    if (initialData && initialData.length) data = JSON.parse(initialData);

    // Format intake into form schema
    const formatted: AssetProps[] | undefined = data?.map((obj) => {
      //attrs
      if (obj.attrs && typeof obj.attrs === 'object') {
        const attrs = Object.keys(obj.attrs).reduce((acc: Attrs[], attr) => {
          acc.push({
            key: attr,
            value: obj[attr],
          });
          return acc;
        }, []);

        obj.attrs = attrs;
      }
      return obj as AssetProps;
    });

    if (formatted) setAssetCollection(formatted);
  }, [initialData]);

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
