"use client";
import FeaturesProperties from "@/components/modules/home/FeaturesProperties";
import HeaderSection from "@/components/modules/home/HeaderSection";
import HowIsItWork from "@/components/modules/home/HowIsItWork";
import Testimonials from "@/components/modules/home/Testimonials";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
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
