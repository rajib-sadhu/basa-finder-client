
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-gray-600">Last Updated: March 15, 2025</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-4">
            Welcome to BasaFinder {`("we," "our," or "us")`}. These Terms and
            Conditions govern your use of our rental housing platform and
            services.
          </p>
          <p className="text-gray-700">
            By accessing or using BasaFinder, you agree to comply with these
            terms. If you disagree with any part, you may not access the
            service.
          </p>
        </section>

        <Separator className="my-6" />

        {/* User Accounts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                You must be at least 18 years old to create an account
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Provide accurate and complete information during registration
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Immediately notify us of any unauthorized use of your account
              </span>
            </li>
          </ul>
        </section>

        <Separator className="my-6" />

        {/* Listings and Rentals */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Property Listings and Rentals
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Landlords:</strong> Must provide accurate property
              information including location, pricing, and amenities. You are
              responsible for the legality of your rental properties.
            </p>
            <p>
              <strong>Tenants:</strong> Must verify property details before
              submitting rental requests. BasaFinder does not guarantee the
              accuracy of listings.
            </p>
            <p>
              All rental agreements are strictly between landlords and tenants.
              BasaFinder acts only as a platform to facilitate connections.
            </p>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Payments */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Payments and Fees</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              BasaFinder may charge service fees for certain transactions. These
              will be clearly disclosed before payment.
            </p>
            <p>
              All payments are processed through secure third-party providers.
              We do not store your full payment details.
            </p>
            <p>
              Refund policies vary by transaction type and will be specified
              during the payment process.
            </p>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Prohibited Conduct */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Prohibited Conduct</h2>
          <p className="text-gray-700 mb-4">You agree not to:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Post false, misleading, or fraudulent information</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Discriminate based on race, religion, gender, or other protected
                classes
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use the platform for any illegal purpose</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Circumvent our payment systems</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Harass other users or BasaFinder staff</span>
            </li>
          </ul>
        </section>

        <Separator className="my-6" />

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>BasaFinder is not responsible for:</p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                The quality, safety, or legality of listed properties
              </li>
              <li className="list-disc">
                User conduct or disputes between landlords and tenants
              </li>
              <li className="list-disc">
                Any damages resulting from use or inability to use our services
              </li>
              <li className="list-disc">
                Unauthorized access to or alteration of your transmissions
              </li>
            </ul>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We may modify these terms at any time. Continued use after changes
            constitutes acceptance. We will notify users of significant changes
            via email or platform notifications.
          </p>
        </section>

        <Separator className="my-6" />

        {/* Contact */}
        {/* <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For questions about these Terms, please contact:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">BasaFinder Support</p>
            <p>Email: legal@basafinder.com</p>
            <p>Phone: +880 1XXX-XXXXXX</p>
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            I Agree to the Terms and Conditions
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default TermsPage;
