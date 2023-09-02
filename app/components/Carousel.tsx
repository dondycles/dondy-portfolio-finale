import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
export default function Carousel({
  hideCarousel,
}: {
  hideCarousel: () => void;
}) {
  const [index, setIndex] = useState<number>(0);
  let gallery = [{ src: "/me.jpg" }, { src: "/me2.jpg" }];
  return (
    <motion.div
      onClick={() => hideCarousel()}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.3 }}
      className="fixed z-[10] top-0 left-0 right-0 h-screen w-screen flex items-center justify-center bg-base-100/25 backdrop-blur-sm"
    >
      <div className="w-full ">
        <div className="flex items-center justify-center gap-[32px] px-[32px] rounded-box mx-auto">
          <button
            className="btn btn-circle bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              if (index === 0) return setIndex(gallery.length - 1);
              setIndex((prev) => prev - 1);
            }}
          >
            <BiSolidLeftArrow />
          </button>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-screen max-w-[600px] aspect-square relative"
          >
            <AnimatePresence>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                key={index}
                alt="John Rod Dondoyano"
                src={gallery[index].src}
                className="absolute top-0 left-0 w-full object-cover aspect-square rounded-box"
              />
            </AnimatePresence>
          </div>
          <button
            className="btn btn-circle bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              if (index === gallery.length - 1) return setIndex(0);
              setIndex((prev) => prev + 1);
            }}
          >
            <BiSolidRightArrow />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
