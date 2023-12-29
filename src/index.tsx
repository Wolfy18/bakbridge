import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

const props: SessionContextProps = {
  showTransaction: rootElement.dataset.showTransaction === 'true',
  transactionUuid: rootElement.dataset.transactionUuid,
  accessToken: rootElement.dataset.accessToken,
  baseUrl: rootElement.dataset.baseUrl,
  policyId: rootElement.dataset.policyId,
};

root.render(
  <React.StrictMode>
    <App {...props} />
  </React.StrictMode>
);
