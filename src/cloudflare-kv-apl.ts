import { APL, AplConfiguredResult, AplReadyResult, AuthData } from "@saleor/app-sdk/APL";

export class CloudflareKvApl implements APL {
  constructor(private kv: KVNamespace<string>) {
  }

  async get(saleorApiUrl: string) {
    const value = await this.kv.get(saleorApiUrl);

    if (value) {
      return JSON.parse(value);
    }

    return undefined;
  }
  async set(authData: AuthData) {
    await this.kv.put(authData.saleorApiUrl, JSON.stringify(authData));
  }
  async delete(saleorApiUrl: string) {
    await this.kv.delete(saleorApiUrl);
  }

  async getAll() {
    // Getting all items is not supported
    return [];
  }

  async isReady(): Promise<AplReadyResult> {
    return {
      ready: true
    }
  }

  async isConfigured(): Promise<AplConfiguredResult> {
    return {
      configured: true,
    }
  };
}
