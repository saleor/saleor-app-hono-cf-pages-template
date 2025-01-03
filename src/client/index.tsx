// Saleor app dashboard must be rendered client-side
// since Saleor Dashboard will send data in runtime
// to our client app
//
// This file is built using Vite

import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge"
import { FC, render } from "hono/jsx/dom";
import { AppPage } from "./page";

const App: FC = () => {
  const appBridgeInstance = typeof window !== "undefined" ? new AppBridge() : undefined;
  console.log(appBridgeInstance)
  return (
    <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
      <AppPage />
    </AppBridgeProvider>
  )
}

const root = document.getElementById('main');
render(<App />, root);
