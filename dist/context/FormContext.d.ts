import React, { PropsWithChildren } from 'react';
interface FormContextProps {
    assetCollection: AssetProps[];
    setAssetCollection: (collection: AssetProps[]) => void;
    openTxDrawer?: boolean;
    setOpenTxDrawer: (state: boolean) => void;
    transaction?: TransactionProps;
    setTransaction: (obj: TransactionProps) => void;
}
export declare const EmptyAsset: {
    blockchain: string;
    name: string;
    image: string;
    amount: number;
};
export declare const useFormContext: () => FormContextProps;
export declare const FormProvider: React.FC<PropsWithChildren & {
    initialData?: string;
    showTransaction?: boolean;
}>;
export {};
