import pages from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import reactPlugin from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        reactPlugin()
      ],
      build: {
        rollupOptions: {
          input: "./client/index.tsx",
          output: {
            "entryFileNames": "static/client.js",
          }
        }
      }
    }
  } else {
    return {
      plugins: [
        devServer({
          entry: 'src/index.tsx',
          adapter,
        }),
        pages(),
      ],
      server: {
        port: 3000,
      }
    }
  }
})
