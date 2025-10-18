import { useCart } from "@shopify/hydrogen-react";
import { LayoutGroup, AnimatePresence, motion } from "motion/react";
import React from "react";
import { Items } from "../cart/items";

const Nav = () => {
  const { lines, totalQuantity, status, cartReady, error } = useCart();
  return (
    <LayoutGroup>
      <div className="uppercase fixed top-4 left-1/2 -translate-x-1/2 w-80 h-fit bg-background/52 backdrop-blur-sm flex flex-col border border-foreground border-b-1">
        {/* Top Bar */}
        <div className="flex justify-between items-center border-b border-foreground px-2 py-1">
          <span className="font-bold text-lg">maison agi</span>
          <button className="flex flex-col justify-between" aria-label="Menu">
            {totalQuantity}
            {/* <span className="block h-[2px] bg-foreground" />
          <span className="block h-[2px] bg-foreground" /> */}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="grid grid-cols-3 gap-0 ">
          <button className="py-1 border border-foreground border-l-0 border-t-0">
            Home
          </button>
          <button className="py-1 border-b border-foreground ">Shop</button>
          <button className="py-1 border border-foreground border-r-0 border-t-0">
            Contact
          </button>
        </nav>

        <motion.div
          layout
          initial={false}
          animate={{
            height: totalQuantity ? "7rem" : 0,
            opacity: totalQuantity ? 1 : 0,
          }}
          transition={{
            height: { type: "spring", stiffness: 240, damping: 28 },
            opacity: { duration: 0.2, ease: "easeInOut" },
          }}
          className="m-0 mr-8 flex flex-col justify-between p-0 select-none "
          style={{
            touchAction: !totalQuantity ? "none" : "auto",
            pointerEvents: !totalQuantity ? "none" : "auto",
          }}
        >
          <motion.div
            layout="position"
            className="relative z-0 flex justify-end h-20 md:h-20"
          >
            <Items />
          </motion.div>

          <motion.div layout className="relative w-24">
            <AnimatePresence>
              {/* {lines && lines.length > 0 && <Checkout />} */}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

export default Nav;
