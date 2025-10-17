"use client";

import {
  AddToCartButton as ShopifyAddToCartButton,
  useProduct,
} from "@shopify/hydrogen-react";

export default function AddToCartButton({ ...rest }) {
  const { selectedVariant } = useProduct();

  return !selectedVariant ? null : (
    <ShopifyAddToCartButton>add</ShopifyAddToCartButton>
  );
}
