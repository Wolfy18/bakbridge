import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';
import parse from 'html-react-parser';
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

const registerComponent = (
  Component: React.FC<PropsWithChildren>,
  ElementName: string
) => {
  // Create a unique class name based on the React component's name or label
  const customElementName = `${ElementName}`
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .toLowerCase();

  if (customElements.get(customElementName)) return;

  class ReactWrapperElement extends HTMLElement {
    connectedCallback() {
      if (!this.isConnected) return;

      // Create an object to hold the props
      const props: {
        [key: string]: string | undefined | null | boolean | (() => void);
      } = {};

      // Iterate over the custom element's attributes
      for (const { name, value } of this.attributes) {
        // Convert attribute names to camelCase for props
        const propName = name.replace(/-([a-z])/g, (letter: string) =>
          letter.toUpperCase()
        );
        // If the attribute doesn't have a value, assume it's a boolean attribute
        if (!['value', 'defaultValue'].includes(propName))
          props[propName] = value !== '' ? value : true;
        else {
          props[propName] = value;
        }
      }
      console.log(props, ' <----- props');
      const reactRoot = ReactDOM.createRoot(this);

      const content = this.innerHTML;
      this.innerHTML = ''; // Remove content to avoid dups

      reactRoot.render(
        <React.StrictMode>
          <Component {...props}>{parse(content)}</Component>
        </React.StrictMode>
      );
    }
  }

  customElements.define(`bak-${customElementName}`, ReactWrapperElement);
};

registerComponent(App, 'App');
