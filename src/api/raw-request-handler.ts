import { Context } from "hono";

/** Web API Request is wrapped in hono's context object
/* Saleor app-sdk accepts only raw Request object
 * */
export const createRawRequestHandler = (handler: (req: Request) => Response | Promise<Response>) => {
  return (context: Context) => {
    return handler(context.req.raw);
  }
}
