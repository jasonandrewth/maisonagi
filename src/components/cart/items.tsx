"use client";

import { useMemo } from "react";

import { AnimatePresence, motion } from "motion/react";
import type { Transition } from "motion/react";
import { useCart } from "@shopify/hydrogen-react";

import { CartLine } from "@shopify/hydrogen-react/storefront-api-types";

import Image from "next/image";
import Link from "next/link";

interface CartImageItem {
  id: String;
  image: {
    url: String;
    width: Number;
    height: Number;
  };
}

function map(
  value: number,
  [inMin, inMax]: [number, number],
  [outMin, outMax]: [number, number]
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const transition: Transition = {
  type: "spring",
  bounce: 0.5,
  delay: 0.25,
  stiffness: 260,
  damping: 20,
};

/**
 * Custom hook to get the image used in the cart's product list
 * Either the custom meta field "cartImage" or the default image
 * @param line CartLine
 * @returns CartImageItem
 */
// function useCartLineImage(line: CartLine) {
//   const { cartImages } = useGlobalData();

//   const cartImage: CartImageItem | undefined = cartImages.find(
//     (entry: any) =>
//       (entry as CartImageItem)?.id &&
//       (entry as CartImageItem)?.id === line.merchandise.product.id
//   );
//   return cartImage?.image || line?.merchandise?.image || null;
// }

const Items = motion.create(() => {
  const cart = useCart();

  return (
    <AnimatePresence>
      {cart.lines?.length && (
        <motion.ul layout key="cartItems">
          <AnimatePresence>
            {cart.lines.map((line, idx) => (
              // @ts-ignore
              <Item line={line} key={line?.id ?? idx} index={idx} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </AnimatePresence>
  );
});

const Item = ({ line, index = 0 }: { line: CartLine; index: number }) => {
  const cart = useCart();

  const image = line.merchandise.image;
  const title = `${line?.merchandise?.product?.title} ${line?.merchandise?.title}`;
  const url = `/products/${line?.merchandise?.product?.handle}`;

  const rotation = useMemo(
    () => map(Math.random(), [0, 1], [10, 40]) * (index % 2 === 0 ? -1 : 1),
    []
  );

  return !line ? null : (
    <motion.li layout layoutId={line?.id}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={transition}
      >
        {image && (
          <Link href={url} scroll={false} title={title}>
            <Image
              src={image?.url as string}
              width={20 as number}
              height={20 as number}
              sizes="4rem"
              alt=""
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            />
          </Link>
        )}
        <button onClick={() => cart.linesRemove([line.id])}>X</button>
      </motion.div>
    </motion.li>
  );
};

export { Items };
