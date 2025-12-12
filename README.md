# Saleor App Hono Cloudflare Pages Example

A lightweight Saleor app template leveraging Hono's ultrafast routing capabilities (under 14kB) and Cloudflare Pages for deployment.

## Overview

This template provides a foundation for building Saleor apps using the Hono framework, featuring:

- **Backend**: Hono-powered API routes for Saleor integration
- **Frontend**: Single Page Application (SPA) for Saleor Dashboard that uses React

## Project Structure

```
├── src/              # Hono application and API routes
│   ├── manifest/     # Saleor manifest handlers
│   └── webhooks/     # Webhook handlers
├── client/           # Dashboard SPA components
├── public/           # Static assets
└── package.json      # Project dependencies
```

## Prerequisites

- Node.js (LTS version recommended)
- pnpm package manager
- Cloudflare account
- Saleor instance

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## Development

Start the development server:
```bash
pnpm run dev
```

The app will be available at `http://localhost:3000`

## Wrangler Configuration

Update existing `wrangler.toml` file in the root of your project with name of your app and Cloudflare KV namespace ID.

```toml
name = "saleor-app-hono"
compatibility_date = "2024-01-08"

[[kv_namespaces]]
binding = "saleor_app_apl"
id = "YOUR_KV_ID"
```

> [!TIP]
> If you update `binding` in `kv_namespace`, you must also update all usages in the app's codebase.

**Important Configuration Notes**:
- Replace `YOUR_KV_ID` with your actual Cloudflare KV namespace ID
- The KV binding will be accessible in your code as `context.env.saleor_app_apl`
- It's safe to commit KV namespace IDs to your repository
- For sensitive data like API keys, use Cloudflare secrets instead of storing them in `wrangler.toml`

## Cloudflare KV APL

This project implements a custom [APL (Auth Persistence Layer)](https://docs.saleor.io/developer/extending/apps/architecture/apl) that stores and retrieves app data from Cloudflare KV. The APL handles:

- **Authentication tokens**: Securely stores app tokens per Saleor instance
- **App configuration**: Persists app settings in Cloudflare KV
- **Multi-tenant support**: Manages data for multiple Saleor instances

The APL implementation follows Saleor's official specification while using Cloudflare KV as the storage backend.

You can check it in `src/cloudflare-kv-apl.ts`.

### Cloudflare KV Structure

The app uses the following KV structure:
```
{saleor_api_url} -> Authentication data
```

## Deployment

Deploy the application to Cloudflare Pages:
```bash
pnpm run deploy
```

## License

BSD-3-Clause

