import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';

interface FormContextProps {
  assetCollection: AssetProps[];
  setAssetCollection: (collection: AssetProps[]) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<
  PropsWithChildren & { initialData?: string }
> = ({ initialData, children }) => {
  const [assetCollection, setAssetCollection] = useState<AssetProps[]>(
    initialData && initialData.length
      ? JSON.parse(initialData)
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
    <FormContext.Provider value={{ assetCollection, setAssetCollection }}>
      {children}
    </FormContext.Provider>
  );
};
