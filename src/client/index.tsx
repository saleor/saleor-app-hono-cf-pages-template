/** Saleor app dashboard must be rendered client-side
* since Saleor Dashboard will send data in runtime
* to our client app
*
* This file is built using Vite
* and uses React for jsx rendering, since
* app-sdk requires React
*/

import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge"
import { AppPage } from "./page";
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";

const appBridgeInstance = typeof window !== "undefined" ? new AppBridge() : undefined;

const App = () => {
  return (
    <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
      <AppPage />
    </AppBridgeProvider>
  )
}

// @ts-expect-error root is not guaranteed in types to be defined
const root = createRoot(document.getElementById("root"))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
