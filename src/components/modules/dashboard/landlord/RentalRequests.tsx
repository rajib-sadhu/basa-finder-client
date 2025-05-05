"use client";
import { ILandlordRequest } from "@/types";
import { Hand } from "lucide-react";
import LandlordRequestCard from "../../requests/LandlordRequestCard";
import { updateStatusRequest } from "@/services/requestService";
import { toast } from "sonner";

const RentalRequests = ({
  landlordRequests,
}: {
  landlordRequests: ILandlordRequest[];
}) => {
  const handleStatusChange = async (id: string, status: string) => {
    const toastId = toast.loading("Changing status...");
    try {
      const res = await updateStatusRequest(id, status);
      toast.success(`Request ${status}`, { id: toastId });

      console.log(res);
    } catch (error) {
      console.log("Status change error", error);
      toast.success(`Status change error:`, { id: toastId });
    }
  };

  if (landlordRequests.length === 0) {
    return (
      <div className="h-52 grid place-content-center">
        <p>You do not have any request</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Hand className="w-5 h-5" /> Rental Requests
        </h1>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {landlordRequests.length &&
          landlordRequests?.map((request) => (
            <LandlordRequestCard
              key={request._id}
              requestData={request}
              handleStatusChange={handleStatusChange}
            />
          ))}
      </div>
    </div>
  );
};

export default RentalRequests;
