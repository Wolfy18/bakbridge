import React, { useEffect, useState } from 'react';
import {
  getWalletIcon,
  isWalletInstalled,
  checkIsMobile,
  estimateAvailableWallets,
  WalletExtensionNotFoundError,
  UnavailableWalletVisibility,
  capitalize,
  chromeStoreUrl,
  flintDeepLink,
  formatSupportedWallets,
  mobileWallets,
  chromeWalletExtensions,
} from '@cardano-foundation/cardano-connect-with-wallet-core';
import { Button, Dropdown, MenuProps } from 'antd';
import useCardano from 'hooks/useCardano';

const ConnectWalletButton = ({
  label,
  disabled,
  message,
  supportedWallets = [
    'Flint',
    'Nami',
    'Eternl',
    'Yoroi',
    'Typhon',
    'NuFi',
    'Lace',
  ],
  showUnavailableWallets = UnavailableWalletVisibility.SHOW_UNAVAILABLE_ON_MOBILE,
  alwaysVisibleWallets = [],
  afterComponent,
  beforeComponent,
  limitNetwork,
  peerConnectEnabled = false,
  onConnect,
  onDisconnect,
  onSignMessage,
  showAccountBalance = false,
  onStakeAddressClick,
  onConnectError,
}: ConnectWalletButtonProps) => {
  const {
    isEnabled,
    stakeAddress,
    signMessage,
    connect,
    disconnect,
    isConnected,
    installedExtensions,
    enabledWallet,
    accountBalance,
    // meerkatAddress,
    connectedCip45Wallet,
  } = useCardano({ limitNetwork: limitNetwork });

  const isMobile = checkIsMobile();

  const connectWallet = async (walletName: string) => {
    const onSuccess = () => {
      if (typeof onConnect === 'function') {
        onConnect(walletName);
      }
    };

    const onError = (error: Error) => {
      if (typeof onConnectError === 'function') {
        onConnectError(walletName, error);
      } else {
        if (error instanceof WalletExtensionNotFoundError) {
          if (walletName.toLowerCase() === 'nami') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.NAMI.name}/${chromeWalletExtensions.NAMI.id}`
            );
          } else if (walletName.toLowerCase() === 'flint') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.FLINT.name}/${chromeWalletExtensions.FLINT.id}`
            );
          } else if (walletName.toLowerCase() === 'typhon') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.TYPHON.name}/${chromeWalletExtensions.TYPHON.id}`
            );
          } else if (walletName.toLowerCase() === 'yoroi') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.YOROI.name}/${chromeWalletExtensions.YOROI.id}`
            );
          } else if (walletName.toLowerCase() === 'eternl') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.ETERNL.name}/${chromeWalletExtensions.ETERNL.id}`
            );
          } else if (walletName.toLowerCase() === 'gerowallet') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.GEROWALLET.name}/${chromeWalletExtensions.GEROWALLET.id}`
            );
          } else if (walletName.toLowerCase() === 'nufi') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.NUFI.name}/${chromeWalletExtensions.NUFI.id}`
            );
          } else if (walletName.toLowerCase() === 'lace') {
            window.open(
              `${chromeStoreUrl}${chromeWalletExtensions.LACE.name}/${chromeWalletExtensions.LACE.id}`
            );
          } else {
            alert(
              `Please make sure you are using a modern browser and the ${walletName} browser extension has been installed.`
            );
          }
        } else {
          alert(`Something went wrong. Please try again later.`);
          console.warn(error);
        }
      }
    };

    connect(walletName, onSuccess, onError);
  };

  const connectMobileWallet = async (walletName: string) => {
    if (!isMobile) {
      connectWallet(walletName);
    }

    if (!mobileWallets.includes(walletName.toLowerCase())) {
      return;
    }

    if (walletName.toLowerCase() === 'flint') {
      if (isWalletInstalled('flint')) {
        connectWallet(walletName);
      } else {
        window.location.href = `${flintDeepLink}${encodeURIComponent(
          window.location.href
        )}`;
      }
    }
  };

  const getDefaultButtonTitle = () => {
    if (showAccountBalance) {
      const balanceWithTwoDecimalPlaces =
        Math.round(accountBalance * 100) / 100;
      return `₳ ${balanceWithTwoDecimalPlaces}`;
    }
    return `${stakeAddress!.slice(0, 12)}...`;
  };

  const buttonTitle =
    stakeAddress && isConnected
      ? getDefaultButtonTitle()
      : label || 'Connect Wallet';

  const clickStakeAddress = () => {
    if (
      stakeAddress &&
      isConnected &&
      typeof onStakeAddressClick === 'function'
    ) {
      onStakeAddressClick(stakeAddress);
    }
  };

  if (typeof beforeComponent === 'undefined' && enabledWallet) {
    const walletIcon = getWalletIcon(enabledWallet);
    beforeComponent = (
      <img
        height={24}
        width={24}
        src={walletIcon}
        alt={`${enabledWallet}-icon`}
      />
    );
  }

  const [items, setItems] = useState<MenuProps['items']>([
    {
      key: 1,
      label: (
        <span id="connect-wallet-hint">{`Please install a wallet browser extension (${formatSupportedWallets(
          supportedWallets
        )} are supported)`}</span>
      ),
    },
  ]);

  useEffect(() => {
    if (isEnabled && isConnected) {
      const actionItems: MenuProps['items'] =
        typeof message === 'string'
          ? [
              {
                key: 1,
                label: (
                  <div onClick={() => signMessage(message, onSignMessage)}>
                    Sign a message
                  </div>
                ),
              },
              {
                key: 2,
                label: (
                  <div
                    onClick={() => {
                      disconnect();
                      if (typeof onDisconnect === 'function') {
                        onDisconnect();
                      }
                    }}
                  >
                    Disconnect
                  </div>
                ),
              },
            ]
          : [
              {
                key: 1,
                label: (
                  <div
                    onClick={() => {
                      disconnect();
                      if (typeof onDisconnect === 'function') {
                        onDisconnect();
                      }
                    }}
                  >
                    Disconnect
                  </div>
                ),
              },
            ];

      setItems(actionItems);
    } else {
      const availableWallets = estimateAvailableWallets(
        peerConnectEnabled && connectedCip45Wallet.current?.name
          ? [connectedCip45Wallet.current.name, ...supportedWallets]
          : supportedWallets,
        showUnavailableWallets,
        alwaysVisibleWallets,
        installedExtensions
      );

      const walletItems: MenuProps['items'] = availableWallets.map(
        (availableWallet: string, index: number) => {
          if (
            isMobile &&
            !mobileWallets.includes(availableWallet.toLowerCase())
          ) {
            return {
              key: index,
              label: (
                <div key={`${availableWallet}-${index}`}>
                  {capitalize(availableWallet)}
                  <span> Desktop Only</span>
                </div>
              ),
            };
          }
          return {
            key: index,
            label: (
              <div
                key={`${availableWallet}-${index}`}
                onClick={() => connectMobileWallet(availableWallet)}
              >
                {capitalize(availableWallet)}
              </div>
            ),
          };
        }
      );
      setItems(walletItems);
    }
  }, [installedExtensions, isConnected]);

  return (
    <>
      <Dropdown menu={{ items }}>
        <Button
          id="connect-wallet-button"
          icon={beforeComponent}
          onClick={clickStakeAddress}
          disabled={disabled}
          className="flex justify-content-start self-center"
        >
          {buttonTitle}
        </Button>
      </Dropdown>
      {afterComponent}
    </>
  );
};

export default ConnectWalletButton;
