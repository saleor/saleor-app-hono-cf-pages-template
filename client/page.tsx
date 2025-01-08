import { useAppBridge } from "@saleor/app-sdk/app-bridge";

export const AppPage = () => {
  const { appBridgeState } = useAppBridge();

  if (appBridgeState?.ready) {
    return (
      <main>
        <h1>Welcome to Saleor App!</h1>
        <code>
          {JSON.stringify(appBridgeState, null, 2)}
        </code>
      </main>
    )
  }

  return (
    <p>Loading...</p>
  )
}
