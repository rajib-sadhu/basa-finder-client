"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";

const OPTIONS: EmblaOptionsType = { loop: true };

const Offer = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const images = [
    "https://i.postimg.cc/HnBp8Gfb/offer1.png",
    "https://i.postimg.cc/rmGycRjn/offer-2.png",
    "https://i.postimg.cc/SRySKQty/offer3.png",
  ];

  return (
    <div className="w-full flex justify-center items-center bg-gray-50  px-4">
      <div
        className="overflow-hidden w-full container rounded-xl shadow-lg"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((src, index) => (
            <div className="flex-[0_0_100%] relative w-full" key={index}>
              <Image
                src={src}
                alt={`Offer ${index + 1}`}
                height={1000}
                width={400}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;
