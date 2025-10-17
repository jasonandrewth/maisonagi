"use client";

import { useCart, useShop } from "@shopify/hydrogen-react";

import { AnimatePresence, motion, LayoutGroup } from "motion/react";

import { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";
import { useMediaQuery } from "@/lib/utils/hooks/useMediaQuery";
import usePrice from "@/lib/utils/hooks/usePrice";
import { Items } from "./items";
import { useEffect } from "react";

const Cart = () => {
  const cart = useCart();
  const shop = useShop();
  const { lines, totalQuantity, status, cartReady, error } = cart;

  const isMobile = useMediaQuery(`( max-width: 680px )`, true);

  useEffect(() => {
    console.log("Shopify:", shop.storeDomain, shop.storefrontApiVersion);
  }, [shop]);

  useEffect(() => {
    console.log("Cart:", status, cartReady, error);
  }, [status, cartReady, error]);

  return (
    <LayoutGroup>
      <motion.div
        layout
        style={{
          position: "fixed",
          top: isMobile ? "auto" : 0,
          left: 0,
          bottom: isMobile ? "auto" : "auto",
          // opacity: !totalQuantity ? 0 : 1,
          opacity: 1,
          touchAction: !totalQuantity ? "none" : "auto",
          pointerEvents: !totalQuantity ? "none" : "auto",
        }}
      >
        <motion.div layout>
          <Items />

          <motion.span layout>{totalQuantity}</motion.span>
        </motion.div>

        <motion.div layout>
          <AnimatePresence>
            {lines && lines.length > 0 && <Checkout />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default Cart;

const Checkout = () => {
  const { status, cost, checkoutUrl } = useCart();

  return (
    <motion.div
      layout
      key="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1 } }}
      exit={{ opacity: 0, transition: { delay: 0 } }}
    >
      {cost?.totalAmount && <Total amount={cost.totalAmount as MoneyV2} />}

      <a href={checkoutUrl} target="_blank">
        checkout
      </a>
    </motion.div>
  );
};

const Total = ({ amount }: { amount: MoneyV2 }) => {
  const { status } = useCart();
  const totalPrice = usePrice(amount);

  return <button>{totalPrice}</button>;
};
