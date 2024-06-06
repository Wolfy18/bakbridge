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
    this.bakToken = options.bakToken;
    this.container = options.container;
    this.baseUrl = options.client?.baseUrl || 'https://bakrypt.io/v1/';
    this.headers = options.client?.headers;
    this.initial = options.initial;
    this.showTransaction = options.showTransaction || false;
    this.transactionUuid = options.transactionUuid || undefined;
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
      policyId: this.policyId,
      onSuccess: this.onSuccess,
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

const devMod = process.env.NODE_ENV !== 'production';
if (devMod && document.querySelector('#BakBridge'))
  new BakBridge({
    bakToken: 'DozHXHQj2QBXuYGJa0WSc97SdJR4o6CZfHkql9JFV3A',
    container: document.querySelector('#BakBridge')!,
    client: {
      baseUrl: 'https://testnet.bakrypt.io/v1/',
      headers: { 'X-CSRFToken': 'mrhPuGLbgC7tTompVp11' },
    },
    // transactionUuid: '1d60d7d8-0294-4488-a534-fd27c2ed7ad7',
    // showTransaction: true,
    // initial: `[{"blockchain":"ADA","name":"aaaaaa","asset_name":"aaaaaa","image":"ipfs://Qmb8ytDTFfsT7LrkpHBaMpohtAL9kK4pnxWJBMTDx1pbJG","amount":1,"description":null,"attrs":{"111":"11111","2222":"2222"},"files":[{"name":"fdsgfsd","src":"ipfs://QmYf6ZyefsJdieM6sX9knbtYhTkjsTMZ9booBPvmigpnMu"}]},{"blockchain":"ADA","name":"bbbbb","asset_name":"bbbbb","image":"ipfs://QmYf6ZyefsJdieM6sX9knbtYhTkjsTMZ9booBPvmigpnMu","amount":1,"description":"description","attrs":{"1":"1","2":"2"},"files":[{"name":"fdsfsd","src":"ipfs://Qmb8ytDTFfsT7LrkpHBaMpohtAL9kK4pnxWJBMTDx1pbJG"}]},{"blockchain":"ADA","name":"333","asset_name":"333","image":"ipfs://Qmb8ytDTFfsT7LrkpHBaMpohtAL9kK4pnxWJBMTDx1pbJG","amount":1,"description":null,"attrs":{},"files":[]}]`,
    onSuccess: (
      transaction: TransactionProps,
      collection: OutputAssetProps[]
    ) => {
      console.log(transaction, collection);
    },
    onLoad: () => {
      console.log('The application is loaded!');
    },
  });
