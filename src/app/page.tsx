import Image from "next/image";
import styles from "./page.module.css";

import { flattenConnection, MediaFile } from "@shopify/hydrogen-react";

import { client } from "@/shopify/client";
import { PRODUCTS_QUERY, NAME_QUERY } from "@/lib/queries";

type Product = {
  id: string;
  handle: string;
  title: string;
  images?: { edges: { node: { url: string; altText?: string } }[] };
};

type StoreData = {
  shop: { name: string };
  products: { edges: { node: Product }[] };
};

export default async function Home() {
  const response = await fetch(client.getStorefrontApiUrl(), {
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    headers: client.getPublicTokenHeaders(),
    method: "POST",
  });

  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  const data: StoreData = json.data;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{data?.shop?.name || "Shop"}</h1>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data?.products?.edges?.map(({ node }) => {
            const img = node.images?.edges?.[0]?.node;
            return (
              <div key={node.id} className="flex flex-col items-start">
                {img && (
                  <Image
                    src={img.url}
                    alt={img.altText || node.title}
                    width={300}
                    height={300}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="mt-2 font-medium">{node.title}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
