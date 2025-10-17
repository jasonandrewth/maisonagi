import * as React from "react";
import { ShopPayButton } from "@shopify/hydrogen-react";

export type ProductPageProps = {
  /** Shopify variant GraphQL ID (e.g., gid://shopify/ProductVariant/123456789) */
  variantId: string;
};

const ProductPage: React.FC<ProductPageProps> = ({ variantId }) => {
  // Guard against missing/empty IDs to avoid runtime errors
  if (!variantId) return null;

  return (
    <div>
      <ShopPayButton variantIds={[variantId]} />
    </div>
  );
};

export default ProductPage;
