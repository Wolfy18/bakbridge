import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class BakBridge {
  bakToken?: string;
  container: HTMLElement;
  baseUrl: string;
  headers?: { [key: string]: string };
  initial?: JSONstring;
  showTransaction?: boolean;
  disableForm?: boolean;
  transactionUuid?: string;
  policyId?: string;
  onLoad: () => void;
  onSuccess: (
    transaction: TransactionProps,
    collection: OutputAssetProps[]
  ) => void;
  onEvent: (
    event_type: string,
    payload?: {
      [key: string]:
        | string
        | number
        | []
        | TransactionProps
        | OutputAssetProps[];
    }
  ) => void;
  onClose: () => void;

  constructor(options: BakBridgeOptions) {
    this.bakToken = options.bakToken || undefined;
    this.container = options.container;
    this.baseUrl = options.client?.baseUrl || 'https://bakrypt.io/v1/';
    this.headers = options.client?.headers;
    this.initial = options.initial;
    this.showTransaction = options.showTransaction || false;
    this.transactionUuid = options.transactionUuid || undefined;
    this.disableForm = options.disableForm || false;
    this.policyId = options.policyId || undefined;
    this.onLoad = options.onLoad || function () {};
    this.onSuccess = options.onSuccess || function () {};
    this.onEvent = options.onEvent || function () {};
    this.onClose = options.onClose || function () {};

    // Initialize BakBridge
    this.init();
  }

  init() {
    const root = ReactDOM.createRoot(this.container);

    const props: SessionContextProps = {
      showTransaction: this.showTransaction,
      accessToken: this.bakToken,
      baseUrl: this.baseUrl,
      initialData: this.initial,
      headers: this.headers,
      transactionUuid: this.transactionUuid,
      disableForm: this.disableForm,
      policyId: this.policyId,
      onSuccess: this.onSuccess,
      setUserToken: function () {},
    };

    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );

    // Trigger onLoad callback
    this.onLoad();
  }
}

declare global {
  interface Window {
    BakBridge: typeof BakBridge;
  }
}

// Add BakBridge to the window object when the script is loaded
window.addEventListener('DOMContentLoaded', () => {
  if (!window.BakBridge) {
    window.BakBridge = BakBridge;
  }
});

export default BakBridge;
