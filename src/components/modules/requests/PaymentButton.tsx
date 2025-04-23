'use client'

import { Button } from "@/components/ui/button";
import { RentalCreatePayment } from "@/services/requestService";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";



const PaymentButton = ({
  status,
  paymentStatus,
  requestId,
}: {
  status: "approved" | "rejected" | "pending";
  paymentStatus: "Paid" | "unpaid";
  requestId: string
}) => {
    console.log(`${requestId}`);
    //   const router = useRouter();
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
  const handdlePayment = async (requestId: string)=>{
    console.log(requestId)
    const res = await RentalCreatePayment({requestId: requestId});
    try {
      console.log(res);
      if (res.status) {
        setTimeout(() => {
            window.location.href = res?.data;
          //   navigate("/user/orders");
          }, 1000);
        // toast.success("Request created successfully!");
        // router.push("/tenant/myRequests");
      }
    } catch (error) {
      console.error("Error during rental request:", error);
      toast.error("Failed to request rental");
    }
  }
  return (
    <Button
    onClick={()=> handdlePayment(`${requestId}`)}
      disabled={paymentStatus === "Paid"}
      className={`w-full ${
        paymentStatus === "Paid"
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white`}
    >
      {paymentStatus === "Paid" ? "Payment Completed" : "Pay Now"}
    </Button>
  );
};

export default PaymentButton