import { createStorefrontClient } from "@shopify/hydrogen-react";

export const client = createStorefrontClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
  // TODO: convert to 'privateStorefrontToken'!
  publicStorefrontToken: process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
  storefrontApiVersion: "2024-10",
});
