
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { ITenantRequest } from "@/types";
import Image from "next/image";
// import { toast } from "sonner";
import PaymentButton from "./PaymentButton";

interface TenantRequestCardProps {
  requestData: ITenantRequest;
}

const TenantRequestCard = ({ requestData }: TenantRequestCardProps) => {
  const { _id, listingId, status, paymentStatus, landlordPhone, message } =
    requestData;

  const imageUrl = listingId?.images?.[0] || "/placeholder-image.jpg";

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={listingId?.title || "Rental Image"}
          fill
          className="object-cover"
          priority
        />
        <Badge className="absolute top-2 right-2 bg-black/80 text-white">
          ${listingId?.rent}/mo
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Status Badge */}
        <Badge
          variant="outline"
          className={
            status === "pending"
              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
              : status === "approved"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-red-100 text-red-800 border-red-300"
          }
        >
          {status.toUpperCase()}
        </Badge>

        {/* Title and Request ID */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {listingId?.title || "No Title"}
          </h3>
          <p className="text-sm text-gray-500">
            Request ID: <span className="font-medium">{_id}</span>
          </p>
          <p className="text-sm text-gray-500">
            Rental ID: <span className="font-medium">{listingId?._id}</span>
          </p>
        </div>

        {/* Landlord Phone (only shown when approved) */}
        {status === "approved" && (
          <div className="text-sm">
            <p className="font-medium text-gray-700">Landlord Contact:</p>
            <p className="text-gray-600">
              Phone: {landlordPhone || "Not provided"}
            </p>
          </div>
        )}

        {/* Message if exists */}
        {message && (
          <div className="text-sm">
            <p className="font-medium text-gray-700">Your Message:</p>
            <p className="text-gray-600 italic">{`"${message}"`}</p>
          </div>
        )}

        {/* Payment Button */}
        <div className="pt-2">
          <PaymentButton paymentStatus={paymentStatus} requestId={_id} status={status} />
        </div>
      </div>
    </div>
  );
};

export default TenantRequestCard;

// const handdlePayment = async (requestId: string)=>{
//   try {
  
//     const res = await RentalCreatePayment(requestId);
//     // console.log(res);
//     if (res.status) {
//       toast.success("Request created successfully!");
//       router.push("/tenant/myRequests");
//     }
//   } catch (error) {
//     console.error("Error during rental request:", error);
//     toast.error("Failed to request rental");
//   }
// }

// const PaymentButton = ({
//   status,
//   paymentStatus,
//   requestId,
// }: {
//   status: "approved" | "rejected" | "pending";
//   paymentStatus: "paid" | "unpaid";
//   requestId: string
// }) => {
//   if (status !== "approved") {
//     return (
//       <Button
//         disabled
//         className={`w-full ${
//           status === "pending"
//             ? "bg-yellow-500 hover:bg-yellow-600"
//             : "bg-red-500 hover:bg-red-600"
//         } text-white`}
//       >
//         {status === "pending" ? "Pending Approval" : "Request Cancelled"}
//       </Button>
//     );
//   }

//   return (
//     <Button
//     onClick={()=> handdlePayment(requestId)}
//       disabled={paymentStatus === "paid"}
//       className={`w-full ${
//         paymentStatus === "paid"
//           ? "bg-green-600 hover:bg-green-700"
//           : "bg-blue-600 hover:bg-blue-700"
//       } text-white`}
//     >
//       {paymentStatus === "paid" ? "Payment Completed" : "Pay Now"}
//     </Button>
//   );
// };
