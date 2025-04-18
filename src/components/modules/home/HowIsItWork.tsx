import { Search, Check, CreditCard, Home } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search Properties",
    description:
      "Browse our extensive collection of rental properties based on your preferences.",
    icon: Search,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 2,
    title: "Submit a Request",
    description:
      "Found your ideal home? Submit a rental request directly to the landlord.",
    icon: Check,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Secure Payment",
    description:
      "Once approved, make a secure payment to finalize your rental agreement.",
    icon: CreditCard,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    title: "Move In",
    description:
      "Get your keys and enjoy your new home! It's that simple with BasaFinder.",
    icon: Home,
    color: "bg-accent-100 text-accent-700",
  },
];

const HowIsItWork = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How BasaFinder Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple four-step process makes finding and securing your next
            rental home quick and easy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full ${step.color} flex items-center justify-center mb-4`}
              >
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIsItWork;
