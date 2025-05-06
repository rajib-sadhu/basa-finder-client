"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PricingPlan {
  _id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

interface PricingProps {
  data: PricingPlan[];
}

const OPTIONS: EmblaOptionsType = { loop: true };

const Pricing: React.FC<PricingProps> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
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

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-4">
          {data.map((plan) => (
            <div
              key={plan?._id}
              className="flex-shrink-0 w-[90%] sm:w-[80%] md:w-1/2 lg:w-1/4 border shadow-md p-4 rounded-md bg-white mx-auto"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-gray-800">
                  ${plan?.price}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {plan?.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {plan?.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {plan?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6 justify-center items-center">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!prevEnabled}
          aria-label="Scroll Left"
          className="p-2 text-white bg-emerald-700 rounded-full hover:bg-emerald-700 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!nextEnabled}
          aria-label="Scroll Right"
          className="p-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pricing;
