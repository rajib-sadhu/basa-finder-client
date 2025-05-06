import Pricing from "@/components/modules/home/Pricing";

interface PricingPlan {
  _id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

const PricingPage = async () => {
  const res = await fetch("http://localhost:5000/api/pricings", {
    cache: "no-store",
  });
  const result = await res.json();
  const data: PricingPlan[] = Array.isArray(result?.data) ? result.data : [];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the best plan that fits your needs.
          </p>
        </div>
        <Pricing data={data} />
      </div>
    </section>
  );
};

export default PricingPage;
