import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col justify-center items-center text-center px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="">
          <AlertTriangle size={48} className="text-yellow-500" />
        </div>

        <h1 className="text-5xl font-extrabold text-emerald-700">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md">
          The page you ere looking for does not exist or might have been moved.
          Let’s get you back on track.
        </p>

        <Link href="/">
          <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
