import { connectorLocalStorageKey, ConnectorNames } from '@soy-libs/uikit';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector
} from '@web3-react/walletconnect-connector';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { setupNetwork } from '~/app/utils/wallet';
import { connectorsByName } from '~/app/utils/web3React';

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connectorID: ConnectorNames, curNet) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(curNet);
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              toast.error('No provider was found');
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              toast.error('Please authorize to access your account');
            } else {
              toast.error(error.message);
            }
          }
        });
      } else {
        toast.warning('The connector config is wrong');
        // toastError('Unable to find connector', 'The connector config is wrong');
      }
    },
    [activate]
  );

  const logout = useCallback(() => {
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
