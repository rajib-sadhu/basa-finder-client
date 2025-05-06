"use client";

import Category from "@/components/modules/home/Category";
import Counters from "@/components/modules/home/Counters";
import FeaturesProperties from "@/components/modules/home/FeaturesProperties";
import HeaderSection from "@/components/modules/home/HeaderSection";
import HowIsItWork from "@/components/modules/home/HowIsItWork";
import Newsletter from "@/components/modules/home/Newsletter";
import Offer from "@/components/modules/home/Offer";
import Testimonials from "@/components/modules/home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeaderSection />
      <FeaturesProperties />
      <HowIsItWork />
      <Category />
      <Testimonials />
      <Offer />
      <Counters />
      <Newsletter />
    </div>
  );
};

export default HomePage;
