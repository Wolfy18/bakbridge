import React from 'react';
declare class BakBridge {
    bakToken?: string;
    container: HTMLElement;
    baseUrl: string;
    headers?: {
        [key: string]: string;
    };
    initial?: JSONstring;
    showTransaction?: boolean;
    disableForm?: boolean;
    transactionUuid?: string;
    policyId?: string;
    onLoad: () => void;
    onSuccess: (transaction: TransactionProps, collection: OutputAssetProps[]) => void;
    onEvent: (event_type: string, payload?: {
        [key: string]: string | number | [] | TransactionProps | OutputAssetProps[];
    }) => void;
    onClose: () => void;
    walletConnector: React.FC<{
        authenticate: ({ address, signature, key, }: {
            address: string;
            signature: string;
            key: string;
        }) => Promise<boolean>;
        onDisconnect?: () => void;
    }>;
    constructor(options: BakBridgeOptions);
    init(): void;
}
declare global {
    interface Window {
        BakBridge: typeof BakBridge;
    }
}
export default BakBridge;
