import { createContext, useState } from 'react';

interface FormContextProps {
  assetCollection: AssetProps[];
  setAssetCollection: (collection: AssetProps[]) => void;
  setNotification?: typeof useState;
}

const FormContext = createContext<FormContextProps>({
  assetCollection: [],
  setAssetCollection: () => undefined,
});

export default FormContext;
