import { env } from "hono/adapter";

import { SaleorApp } from "@saleor/app-sdk/saleor-app";
import type { APL } from "@saleor/app-sdk/APL";
import { UpstashAPL } from "@saleor/app-sdk/APL/upstash";
import { Context } from "hono";
import { Bindings } from "./bindings";
import { CloudflareKvApl } from "./cloudflare-kv-apl";

/**
 * APL (Auth Persistence Layer) stores authentication tokens per Saleor instance.
 * This project supports CloudflareKvApl (recommended) or UpstashAPL.
 *
 * To read more about APL, see:
 * https://docs.saleor.io/developer/extending/apps/architecture/apl
 */
export const getApl = (c: Context): APL => {
  const { APL, saleor_app_apl } = env<Bindings>(c);

  switch (APL) {
    case "cloudflare-kv":
      return new CloudflareKvApl(saleor_app_apl);
    case "upstash":
      // Require `UPSTASH_URL` and `UPSTASH_TOKEN` environment variables
      return new UpstashAPL();
    default:
      throw new Error("Cannot find valid APL");
  }
}

export const getSaleorApp = (c: Context): SaleorApp => {
  const apl = getApl(c);
  return new SaleorApp({ apl })
}
