"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Carousel from "./Carousel";
export default function Avatar() {
  const [showCarousel, setShowCarousel] = useState<Boolean>(false);
  return (
    <>
      <div
        onClick={() => setShowCarousel(true)}
        className="avatar cursor-pointer"
      >
        <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
          <Image
            height={720}
            width={720}
            alt="John Rod"
            src="/me.jpg"
            quality={100}
            priority
          />
        </div>
      </div>
      <AnimatePresence>
        {showCarousel && (
          <Carousel hideCarousel={() => setShowCarousel(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
