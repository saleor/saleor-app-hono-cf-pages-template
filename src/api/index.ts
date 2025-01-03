import { createAppRegisterHandler, createManifestHandler } from "@saleor/app-sdk/handlers/fetch-api";
import { Context, Hono } from "hono";
import packageJson from "../../package.json";
import { getApl } from "../saleor-app";
import { Bindings } from "../bindings";
import webhookRotues from "./webhooks";

const app = new Hono<{ Bindings: Bindings }>();

// Web API Request is wrapped in hono's context object
// Saleor app-sdk accepts only raw Request object
const createRawRequestHandler = (handler: (req: Request) => Response | Promise<Response>) => {
  return (context: Context) => {
    return handler(context.req.raw);
  }
}

app.get("/manifest", createRawRequestHandler(createManifestHandler({
  async manifestFactory({ appBaseUrl }) {
    return {
      name: 'Saleor App Template',
      tokenTargetUrl: `${appBaseUrl}/api/register`,
      appUrl: `${appBaseUrl}/app`,
      permissions: [],
      id: "saleor.app.hono",
      version: packageJson.version,
      webhooks: [],
      extensions: [],
      author: "Jonatan Witoszek",
    }
  }
})));

app.post("/register", c => createAppRegisterHandler({
  apl: getApl(c),
})(c.req.raw));

app.route("/webhooks", webhookRotues)

export default app;
