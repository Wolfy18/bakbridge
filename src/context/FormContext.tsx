import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useMemo,
} from 'react';
import { transformIntakeIntoAssetProps } from 'utils';

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
  PropsWithChildren & {
    initialData?: string;
    showTransaction?: boolean;
  }
> = ({ initialData, showTransaction, children }) => {
  const initCollection = useMemo(() => {
    let data: IntakeAssetProps[] | undefined;
    if (initialData && initialData.length) data = JSON.parse(initialData);

    // Format intake into form schema
    const formatted = transformIntakeIntoAssetProps(data);

    return formatted;
  }, [initialData]);

  const [assetCollection, setAssetCollection] = useState<AssetProps[]>(
    initCollection || [EmptyAsset]
  );

  const [openTxDrawer, setOpenTxDrawer] = useState<boolean | undefined>(
    showTransaction
  );

  const [transaction, setTransaction] = useState<TransactionProps | undefined>(
    undefined
  );

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
