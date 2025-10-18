"use client";

import { FC, PropsWithChildren } from "react";

import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";

//Components
import Nav from "./nav";
import Cart from "@/components/cart/cart";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ShopifyProvider
      storeDomain={`https://${process.env.NEXT_PUBLIC_STORE_DOMAIN}`}
      // storeDomain={process.env.NEXT_PUBLIC_STORE_DOMAIN!}
      storefrontToken={process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN ?? ""}
      storefrontApiVersion={process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION!}
      countryIsoCode="DE"
      languageIsoCode="DE"
    >
      <CartProvider key={"cart"}>
        <Nav />
        <main className="mt-24">
          <Cart />
          {children}
        </main>
      </CartProvider>
    </ShopifyProvider>
  );
};

export default Layout;
