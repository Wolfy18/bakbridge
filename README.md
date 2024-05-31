<p align="center">
  <a href="" rel="noopener">
 <img src="https://gateway.bakrypt.io/ipfs/QmabiW5CKDLYZTNpjzs8nhvNE6a1RAe9HtvPmaLxgq2Hqw" alt="BakBridge"></a>
</p>
<h1 align="center">BAK Bridge </h1>
<div align="center"><a href="https://bakrypt.io"><small>by Bakrypt.io™</div></div></a>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> 
Integrate Bakrypt.io into your existing platform, this powerful tool empowers you to transform your digital assets into valuable NFTs with ease. The BakBridge intuitive interface ensures a seamless minting experience. You can design and mint native tokens directly into your wallet, simplifying the entire process.
    <br> 
</p>

## 📝 Table of Contents

- [Problem statement](#problem_statement)
- [Idea / Solution](#idea)
- [Dependencies / Limitations](#limitations)
- [Future Scope](#future_scope)
- [Setting up a local environment](#getting_started)
- [Technology Stack](#tech_stack)
- [Authors](#authors)
- [Stake and support](#support)

## 🧐 Problem statement <a name = "problem_statement"></a>

The ideal scenario envisions a streamlined integration process with Bakrypt.io API for transforming digital assets into NFTs. The goal is to encapsulate common use cases with a React application, providing other integrations and applications with a preloaded solution that accelerates the integration with Bakrypt.io API. The desired outcome is an intuitive and efficient interface that simplifies minting tokens and enhances the overall user experience.

The goal is to create a standardized and efficient method for handling asset validation and file uploads across various widgets and endpoints. This approach will significantly reduce the time and effort required to upload files, ensuring a seamless and user-friendly experience for integrating platforms. By implementing a standardized mechanism, developers can focus on enhancing other aspects of the integration, leading to faster deployment and improved user satisfaction.

## 💡 Idea / Solution <a name = "idea"></a>

Bak Bridge is a drop-in module for your users to preload, create and mint Cardano native tokens. This allows you to access their data using Bakrypt's API. Bak Bridge handles authentication, asset validation, transaction configuration and error handling.

<p align="center">
  <img src="https://gateway.bakrypt.io/ipfs/QmaUrnds8hE81pa5joyzdWaCdd3syVZ69EKf3EW6tw5jxe" alt="BakBridge" width="350px">
</p>

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- What are the dependencies of your project?
- The App requires a `Bearer Access Token` to communicate with Bakrypt's API. Follow the documentation to learn more about our authentication schema. 

[Authorization and Access Tokens](https://bakrypt.readme.io/reference/authorization-and-access-tokens)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

### `pnpm install`

Installs all the required libraries.

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 🚀 Deployment <a name = "deployment"></a>
You can load Bak Bridge via IPFS or by installing it locally.

### CDN installation
```
# [index].html

<div id="BakBridgeContainer"></div>

<link rel="stylesheet" href="BakBridge/css/main.css" type="text/css" media="all" />
<script src="BakBridge/js/main.bundle.js"></script>

<script type="text/javascript">
    // Your code here, ensuring BakBridge is defined and ready to use
    window.onload = () => new BakBridge({
        bakToken: '<Bearer Access Token>',
        container: document.querySelector('#BakBridgeContainer'),
        client: {
            baseUrl: "https://testnet.bakrypt.io", # Defaults to https://bakrypt.io
            headers: { 'X-CSRFToken': "<additional headers>" }, # Optional: Add additional headers to the axios client.
        },
    });
</script>
```

### npm installation

```
pnpm install @bak/bridge
```

```
# Component.tsx

import BakBridge from "@bak/bridge";

import "@bak/bridge/build/css/main.css";

function Component = () => {

  const bridgeRef = useRef()

  useEffect(() => {
    bridge = new BakBridge({
        bakToken: '<Bearer Access Token>',
        container: bridgeRef,
        client: {
            baseUrl: "https://testnet.bakrypt.io", # Defaults to https://bakrypt.io
            headers: { 'X-CSRFToken': "<additional headers>" }, # Optional: Add additional headers to the axios client.
        },
    });
  }, [])

  return (<div ref={bridgeRef}></div>)

}

```

## ⛏️ Built With <a name = "tech_stack"></a>

- [React](https://react.dev/) - Web interface
- [Antd](https://ant.design/) - Design System
- [Tailwind](https://tailwindcss.com/) - CSS Utilities
- [Formik](https://formik.org/) - Form Library

## ✍️ Authors <a name = "authors"></a>

- [@bakrypt_io](https://github.com/wolfy18) - Idea & Initial work


## 🎉 ADA Stake Pool 
### How to start delegating ADAs?  <a name = "support"></a>

[https://bakrypt.io/pool](https://bakrypt.io/pool)

Visit our website to learn more on how to start staking and earning rewards. This is a great way to support the development of the project with good incentives for our delegators.

  <a href="" rel="noopener">

 <img src="https://gateway.bakrypt.io/ipfs/QmV4RbFcAnP8QyL59TRqZnD7ozKHHbudW35eGn5oe4D1JK" alt="Bakrypt logo" width="200px"></a>

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).