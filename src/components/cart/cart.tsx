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
        className="w-64 fixed right-0 z-[4000] m-4 mr-8 flex flex-col justify-between h-28 p-4 bg-[rgba(40,40,40,0.7)] rounded-xl md:rounded-lg select-none"
        style={{
          top: isMobile ? "auto" : 0,
          left: 0,
          bottom: isMobile ? 0 : "auto",
          opacity: !totalQuantity ? 0 : 1,
          touchAction: !totalQuantity ? "none" : "auto",
          pointerEvents: !totalQuantity ? "none" : "auto",
        }}
      >
        <motion.div
          layout
          className="relative z-0 flex justify-end h-20 md:h-20"
        >
          <Items />
        </motion.div>

        <motion.div layout className="relative w-24">
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
      {/* {cost?.totalAmount && <Total amount={cost.totalAmount as MoneyV2} />} */}

      <a
        href={checkoutUrl}
        target="_blank"
        className="w-12 inline-flex items-center justify-center px-1 py-2 border border-black/20 uppercase tracking-wide text-sm bg-white/90 hover:bg-white transition"
      >
        Checkout
      </a>
    </motion.div>
  );
};

const Total = ({ amount }: { amount: MoneyV2 }) => {
  const { status } = useCart();
  const totalPrice = usePrice(amount);

  return (
    <span className="inline-flex min-w-[5em] justify-center px-3 py-2 border border-black/20 rounded-md bg-white/90 text-black">
      {totalPrice}
    </span>
  );
};
