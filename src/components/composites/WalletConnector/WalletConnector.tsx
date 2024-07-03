import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ConnectWalletButton,
  ConnectWalletButtonProps,
  useCardano,
} from '@cardano-foundation/cardano-connect-with-wallet';
import { Alert, message } from 'antd';
import Link from 'antd/es/typography/Link';
import useBakClient from 'client/bakrypt';
import { useSessionContext } from 'context/SessionContext';

const WalletConnector: React.FC = () => {
  const { isConnected, stakeAddress, installedExtensions, isConnecting } =
    useCardano();
  const [messageApi, contextHolder] = message.useMessage();

  const { authenticateWallet } = useBakClient();
  const { setUserToken } = useSessionContext();

  const verifyWallet = useCallback(
    async (signature: string, key: string) => {
      if (!stakeAddress) return;

      messageApi.open({
        type: 'loading',
        duration: 0,
        content: 'Fetching user profile',
      });

      try {
        const access = await authenticateWallet({
          address: stakeAddress,
          signature,
          key,
        });

        if (access && access.access_token) {
          setUserToken(access.access_token);
          setIsLogged(true);
        }
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: 'Failed to verify wallet',
        });
        console.error(error);
      }

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
            onDisconnect={() => setUserToken(undefined)}
          />
          {!isLogged && isConnected ? (
            <p>
              Bakrypt.io requires an account to enable mint scripts, and IPFS
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
