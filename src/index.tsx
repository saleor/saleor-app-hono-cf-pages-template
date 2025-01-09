import { Hono } from 'hono'
import apiRoutes from "./api";
import { Bindings } from './bindings';

const app = new Hono<{ Bindings: Bindings }>();

const getBaseUrl = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.origin;
};

app.get("/", (c) => {
  const baseUrl = getBaseUrl(c.req.url);

  return c.html(
    <main>
      <h1>Welcome to Saleor App!</h1>

      <p>Install app in Saleor using this manifest URL:</p>
      <code>{baseUrl + "/api/manifest"}</code>
    </main>
  )
});

app.get("/app", c => {
  return c.html(
    <html>
      <head>
        {import.meta.env.PROD ? (
          <script type='module' src='/static/client.js'></script>
        ) : (
          <script type='module' src='/client/index.tsx'></script>
        )}
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

app.notFound((c) => {
  return c.html(
    <html>
      <body>
        <main>
          <h1>Not found</h1>
          <p>Requested page was not found</p>
        </main>
      </body>
    </html>
  );
});

app.route("/api", apiRoutes)

export default app
