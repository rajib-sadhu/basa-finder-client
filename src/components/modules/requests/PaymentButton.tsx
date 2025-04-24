"use client";

import { Button } from "@/components/ui/button";
import { RentalCreatePayment } from "@/services/requestService";
import { Loader } from "lucide-react";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentButton = ({
  status,
  paymentStatus,
  requestId,
}: {
  status: "approved" | "rejected" | "pending";
  paymentStatus: "paid" | "unpaid";
  requestId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (status !== "approved") {
    return (
      <Button
        disabled
        className={`w-full ${
          status === "pending"
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-red-500 hover:bg-red-600"
        } text-white`}
      >
        {status === "pending" ? "Pending Approval" : "Request Cancelled"}
      </Button>
    );
  }

  const handlePayment = async (requestId: string) => {
    setIsLoading(true);

    try {
      const res = await RentalCreatePayment({ requestId: requestId });

      if (res.status) {
        setTimeout(() => {
          window.location.href = res?.data;
        }, 1000);

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during rental request:", error);
      toast.error("Failed to request rental");
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={() => handlePayment(`${requestId}`)}
      disabled={paymentStatus === "paid" || isLoading}
      className={`w-full ${
        paymentStatus === "paid"
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white`}
    >
      {isLoading && <Loader className="animate-spin" /> }
      {paymentStatus === "paid" ? "Payment Completed" : "Pay Now"}
    </Button>
  );
};

export default PaymentButton;
