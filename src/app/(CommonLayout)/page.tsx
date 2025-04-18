
import FeaturesProperties from "@/components/modules/home/FeaturesProperties";
import HeaderSection from "@/components/modules/home/HeaderSection";
import HowIsItWork from "@/components/modules/home/HowIsItWork";
import Testimonials from "@/components/modules/home/Testimonials";
import { getCurrentUser } from "@/services/AuthService";



const HomePage = async () => {
  const user = await getCurrentUser();
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
