import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class BakBridge {
  bakToken: string;
  container: HTMLElement;
  baseUrl: string;
  headers?: { [key: string]: string };
  initial?: JSONstring;
  showTransaction?: boolean;
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
    this.bakToken = options.bakToken;
    this.container = options.container;
    this.baseUrl = options.client?.baseUrl || 'https://bakrypt.io/v1/';
    this.headers = options.client?.headers;
    this.initial = options.initial;
    this.showTransaction = options.showTransaction || false;
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
      onSuccess: this.onSuccess,
      // transactionUuid: this.container.dataset.transactionUuid,
      // policyId: this.container.dataset.policyId,
    };

    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );

    // Trigger onLoad callback
    this.onLoad();
  }

  // TODO
  // handleBridgeEvent(
  //   eventType: string,
  //   payload?: {
  //     [key: string]:
  //       | string
  //       | number
  //       | []
  //       | TransactionProps
  //       | OutputAssetProps[];
  //   }
  // ) {
  //   console.log(payload);
  //   // Simulate handling bridge events
  //   switch (eventType) {
  //     case 'success':
  //       // Trigger onSuccess callback
  //       console.log(payload, '<--- this is the payload');
  //       if (payload && 'transaction' in payload && 'collection' in payload)
  //         this.onSuccess(
  //           payload['transaction'] as TransactionProps,
  //           payload['collection'] as OutputAssetProps[]
  //         );
  //       break;
  //     case 'event':
  //       // Trigger onEvent callback
  //       this.onEvent('some_event_type', payload);
  //       break;
  //     case 'close':
  //       // Trigger onClose callback
  //       this.onClose();
  //       break;
  //     default:
  //       break;
  //   }
  // }
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

const devMod = process.env.NODE_ENV !== 'production';
if (devMod && document.querySelector('#BakBridge'))
  new BakBridge({
    bakToken: 'pCC506OkwiPTom04B1a4iD45_Uhr0eE_QDz88XHVwtQ',
    container: document.querySelector('#BakBridge')!,
    client: {
      baseUrl: 'https://testnet.bakrypt.io/v1/',
      headers: { 'X-CSRFToken': 'mrhPuGLbgC7tTompVp11' },
    },
    onSuccess: (
      transaction: TransactionProps,
      collection: OutputAssetProps[]
    ) => {
      console.log(transaction, collection);
    },
  });
