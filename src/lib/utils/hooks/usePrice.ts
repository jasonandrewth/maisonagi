import { useMoney } from "@shopify/hydrogen-react";
import { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";

/**
 * Wrapper around Shopify's useMoney
 * to stylistically modify the price display
 *
 * @param MoneyV2 amount
 * @returns string
 */
export default function usePrice(amount: MoneyV2) {
  const { withoutTrailingZeros } = useMoney(amount);

  return withoutTrailingZeros.replace("€", "EUR");
}

export { usePrice };
