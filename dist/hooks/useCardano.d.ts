/// <reference types="react" />
import { NetworkType } from '@cardano-foundation/cardano-connect-with-wallet-core';
declare const useCardano: (props?: {
    limitNetwork?: NetworkType;
}) => {
    isEnabled: boolean;
    isConnected: boolean;
    isConnecting: boolean;
    enabledWallet: string | null;
    stakeAddress: string | null;
    usedAddresses: string[];
    unusedAddresses: string[];
    signMessage: (message: string, onSignMessage?: ((signature: string, key: string | undefined) => void) | undefined, onSignError?: ((error: Error) => void) | undefined) => Promise<void>;
    connect: (walletName: string, onConnect?: () => void | undefined, onError?: ((code: Error) => void) | undefined) => Promise<void>;
    disconnect: () => void;
    installedExtensions: string[];
    accountBalance: number;
    dAppConnect: import("react").MutableRefObject<null>;
    meerkatAddress: string;
    cip45Connected: import("react").MutableRefObject<boolean>;
    cip45Address: import("react").MutableRefObject<string | null>;
    cip45Identicon: import("react").MutableRefObject<string | null>;
    connectedCip45Wallet: import("react").MutableRefObject<IWalletInfo | null>;
};
export default useCardano;
