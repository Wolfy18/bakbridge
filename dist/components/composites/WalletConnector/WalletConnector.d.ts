import React from 'react';
declare const WalletConnector: React.FC<{
    authenticate: ({ address, signature, key, }: {
        address: string;
        signature: string;
        key: string;
    }) => Promise<boolean>;
    onDisconnect?: () => void;
}>;
export default WalletConnector;
