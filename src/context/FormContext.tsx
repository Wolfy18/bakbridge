import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useMemo,
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
    const formatted: AssetProps[] | undefined = data?.map((obj) => {
      //attrs
      if (obj.attrs) {
        if (typeof obj.attrs === 'object' && !Array.isArray(obj.attrs)) {
          const attrs = Object.keys(obj.attrs).reduce(
            (acc: Attrs[], attr: keyof Attrs) => {
              acc.push({
                key: attr,

                // @ts-expect-error wip: working on this type error
                value: obj.attrs ? obj.attrs[attr] : null,
              });
              return acc;
            },
            []
          );

          obj.attrs = attrs;
        } else if (Array.isArray(obj.attrs)) {
          const attrs = obj.attrs?.reduce((acc: Attrs[], obj: Attrs) => {
            Object.keys(obj).map((i) => {
              acc.push({
                key: i,
                value: obj[i],
              });
            });
            return acc;
          }, []);

          obj.attrs = attrs;
        }
      }

      return obj as AssetProps;
    });

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
