// app/info/page.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function InformationPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Information Center</h1>
      
      {/* FAQ Section */}
      <section className="mb-16" id="faq">
        <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator className="my-8" />

      {/* Privacy Policy Section */}
      <section className="mb-16" id="privacy">
        <h2 className="text-3xl font-semibold mb-6">Privacy Policy</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {privacyPolicySections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-medium mb-3">{section.title}</h3>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* News Section */}
      <section id="news">
        <h2 className="text-3xl font-semibold mb-6">Latest News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
                <p className="text-sm text-gray-500">{news.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-3">{news.content}</p>
                <Button variant="link" className="px-0 mt-4">
                  Read more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// FAQ Data
const faqData = [
  {
    question: "How do I create an account?",
    answer: "Click on the 'Register' button in the top navigation and fill out the form with your details. Choose your role as either landlord or tenant."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept all major credit cards, mobile banking, and digital wallets through our secure payment gateway."
  },
  {
    question: "How can I list my property for rent?",
    answer: "After logging in as a landlord, navigate to your dashboard and click 'Add New Listing'. Fill out the property details and submit for approval."
  },
  {
    question: "How long does approval take for rental requests?",
    answer: "Landlords typically respond within 24-48 hours. You'll receive an email notification when your request status changes."
  },
  {
    question: "Can I edit my rental listing after posting?",
    answer: "Yes, you can edit your listings anytime from your landlord dashboard. Changes may require admin approval before going live."
  }
];

// Privacy Policy Data
const privacyPolicySections = [
  {
    title: "Information Collection",
    content: "We collect personal information when you register, create listings, or submit rental requests. This includes name, email, contact details, and property information necessary for our services."
  },
  {
    title: "Data Usage",
    content: "Your information is used to provide and improve our services, facilitate communication between users, process payments, and ensure platform security. We never sell your personal data to third parties."
  },
  {
    title: "Cookies",
    content: "We use cookies to enhance your experience, analyze site usage, and deliver personalized content. You can manage cookie preferences in your browser settings."
  },
  {
    title: "Security",
    content: "We implement industry-standard security measures including encryption, secure servers, and regular audits to protect your information from unauthorized access."
  },
  {
    title: "Changes to Policy",
    content: "We may update this policy periodically. Significant changes will be communicated via email or through notifications on our platform."
  }
];

// News Data
const newsItems = [
  {
    title: "New Features Launched",
    date: "March 15, 2025",
    content: "We've added several new features including instant messaging between landlords and tenants, and enhanced search filters for better property discovery."
  },
  {
    title: "Platform Maintenance Scheduled",
    date: "March 10, 2025",
    content: "There will be scheduled maintenance on March 20th from 2:00 AM to 4:00 AM. The platform may be temporarily unavailable during this time."
  },
  {
    title: "Partnership with Payment Providers",
    date: "February 28, 2025",
    content: "We're excited to announce new partnerships with leading payment providers to offer more flexible payment options for our users."
  }
];