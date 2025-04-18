import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tenant",
    quote:
      "BasaFinder  made it so easy to find my dream apartment. The search functionality is intuitive, and I was able to find a place within my budget in my preferred location.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Landlord",
    quote:
      "As a property owner, BasaFinder  has streamlined my rental process. I've found reliable tenants quickly, and the dashboard makes managing my listings effortless.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Tenant",
    quote:
      "I was able to secure my rental property without any hassle. The payment system is secure, and the landlord communication feature was extremely helpful during the process.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from tenants and landlords who have successfully used
            BasaFinder to find their perfect rental match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-emerald-100 p-6 rounded-lg shadow-md relative"
            >
              <Quote
                size={32}
                className="text-emerald-200 absolute top-6 right-6"
              />
              <p className="text-gray-600 mb-6 relative z-10">
                {`"`}
                {testimonial.quote}
                {`"`}
              </p>
              <div className="flex items-center">
                <Image
                  src={
                    testimonial?.avatar ||
                    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                  }
                  alt={testimonial?.name}
                  width={500}
                  height={500}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
