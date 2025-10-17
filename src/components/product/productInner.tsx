"use client";

import {
  AddToCartButton,
  ShopPayButton,
  useProduct,
  useShop,
} from "@shopify/hydrogen-react";

import React, { useEffect } from "react";

const ProductInner = () => {
  const { selectedVariant, product } = useProduct();
  const shop = useShop();

  useEffect(() => {
    if (!shop?.storeDomain) {
      console.warn(
        "[ShopifyProvider] storeDomain is undefined. Check ShopifyProvider placement and NEXT_PUBLIC_SHOPIFY_* env vars."
      );
    } else {
      console.log("Shopify context:", {
        storeDomain: shop.storeDomain,
        storefrontApiVersion: shop.storefrontApiVersion,
      });
    }
  }, [shop?.storeDomain, shop?.storefrontApiVersion]);

  const variantId =
    selectedVariant?.id ?? product?.variants?.edges?.[0]?.node?.id;

  if (!variantId) return null;

  if (!shop?.storeDomain) {
    return null; // no provider -> avoid hitting https://undefined/api/...
  }

  return (
    <div className="mt-6 flex items-center gap-4">
      <AddToCartButton
        variantId={variantId}
        quantity={1}
        className="px-4 py-2 border rounded"
      >
        Add to cart
      </AddToCartButton>
      <ShopPayButton
        variantIds={[variantId]}
        className="px-4 py-2 border rounded"
      />
    </div>
  );
};

export default ProductInner;
