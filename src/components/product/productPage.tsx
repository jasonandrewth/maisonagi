"use client";
import * as React from "react";
import {
  ShopifyProvider,
  CartProvider,
  ProductProvider,
} from "@shopify/hydrogen-react";
import Image from "next/image";
// import AddToCartButton from "../global/addTocartButton";
import { AddToCartButton } from "@shopify/hydrogen-react";
import ProductInner from "./productInner";

export type ProductPageProps = {
  /** Shopify variant GraphQL ID (e.g., gid://shopify/ProductVariant/123456789) */

  product: any;
};
const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const img = product.featuredImage;

  return (
    <ProductProvider data={product}>
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6">{product.title}</h1>
        {img && (
          <Image
            src={img.url}
            alt={img.altText || product.title}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 720px"
            className="w-full max-w-2xl object-cover rounded-md"
            priority
          />
        )}

        <ProductInner />
      </div>
    </ProductProvider>
  );
};

export default ProductPage;
