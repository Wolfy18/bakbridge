import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ConnectWalletButtonProps,
  ConnectWalletButton,
  useCardano,
} from '@cardano-foundation/cardano-connect-with-wallet';

import { Alert, message } from 'antd';
import Link from 'antd/es/typography/Link';

const WalletConnector: React.FC<{
  authenticate: ({
    address,
    signature,
    key,
  }: {
    address: string;
    signature: string;
    key: string;
  }) => Promise<boolean>;
  onDisconnect?: () => void;
}> = ({ authenticate, onDisconnect }) => {
  const { isConnected, stakeAddress, installedExtensions, isConnecting } =
    useCardano();
  const [messageApi, contextHolder] = message.useMessage();

  const verifyWallet = useCallback(
    async (signature: string, key: string) => {
      if (!stakeAddress) return;

      messageApi.open({
        type: 'loading',
        duration: 0,
        content: 'Fetching user profile',
      });

      const isLogged = await authenticate({
        address: stakeAddress,
        signature,
        key,
      });
      setIsLogged(isLogged);
      setTimeout(messageApi.destroy, 3000);
    },
    [stakeAddress, messageApi]
  );

  const handleConnectError = () => {
    messageApi.open({
      type: 'error',
      content: 'Failed to connect wallet',
    });
  };

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const buttonConfig: ConnectWalletButtonProps = useMemo(() => {
    if (isLogged) return { dAppName: 'Bakrypt.io' };

    return {
      dAppName: 'Bakrypt.io',
      message:
        'By accessing or using any or all of the Services, you expressly acknowledge that (i) you have read and understood these Terms; (ii) you agree to be bound by these Terms; and (iii) you are legally competent to enter into these Terms. You can find our terms and conditions in our website https://bakrypt.io/terms',
      onSignMessage: (signature: string, key?: string) => {
        if (key) verifyWallet(signature, key);
      },
    };
  }, [isLogged, verifyWallet]);

  useEffect(() => {
    if (isConnecting)
      messageApi.open({
        type: 'loading',
        content: 'Wallet is connecting...',
      });

    if (isConnected) messageApi.destroy();
  }, [isConnecting, isConnected, messageApi]);

  const handleDisconnect = () => {
    if (onDisconnect) onDisconnect();
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          // maxWidth: 240,
          // minWidth: 180,
          lineHeight: 1.5,
        }}
        className="mb-4"
      >
        {!isLogged && isConnected ? (
          <div className="mb-1">
            <Alert
              message="Sign message to verify account"
              type="info"
              showIcon
            />
          </div>
        ) : null}
        <div className="flex justify-content-end gap-4">
          <ConnectWalletButton
            {...buttonConfig}
            borderRadius={6}
            onConnectError={handleConnectError}
            onDisconnect={handleDisconnect}
          />
          {!isLogged && isConnected ? (
            <p>
              Bakrypt.io requires an account to enable native scripts, and IPFS
              features. By signing the message, you agree to the{' '}
              <a
                href="https://bakrypt.io/terms/"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
              </a>
            </p>
          ) : null}
        </div>
        {!installedExtensions.length ? (
          <small>
            Install a{' '}
            <Link
              target="_blank"
              href="https://developers.cardano.org/docs/integrate-cardano/creating-wallet-faucet/"
            >
              Cardano browser extension
            </Link>
          </small>
        ) : null}
      </div>
    </>
  );
};

export default WalletConnector;
