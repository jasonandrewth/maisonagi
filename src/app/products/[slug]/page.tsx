import React from "react";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/queries";
import { client } from "@/shopify/client";
import Image from "next/image";

//components
import ProductPage from "@/components/product/productPage";

export default async function ProductPageServer({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await fetch(client.getStorefrontApiUrl(), {
    method: "POST",
    headers: client.getPublicTokenHeaders(),
    body: JSON.stringify({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: slug },
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  const data: any = json.data;

  const product = data?.product;

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return <ProductPage product={product} />;
}
