import { Hono } from "hono";
import { Bindings } from "../../bindings";

const app = new Hono<{ Bindings: Bindings }>();

app.post("/order-created", c => {

})

export default app;
