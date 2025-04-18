"use client";
import FeaturesProperties from "@/components/modules/home/FeaturesProperties";
import HeaderSection from "@/components/modules/home/HeaderSection";
import HowIsItWork from "@/components/modules/home/HowIsItWork";
import Testimonials from "@/components/modules/home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeaderSection />
      <FeaturesProperties />
      <HowIsItWork />
      <Testimonials />
    </div>
  );
};

export default HomePage;
