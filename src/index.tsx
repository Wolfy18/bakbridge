import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

const props: SessionContextProps = {
  testnet: rootElement.dataset.testnet === 'true',
  showTransaction: rootElement.dataset.showTransaction === 'true',
  transactionUuid: rootElement.dataset.transactionUuid,
};

root.render(
  <React.StrictMode>
    <App {...props} />
  </React.StrictMode>
);
