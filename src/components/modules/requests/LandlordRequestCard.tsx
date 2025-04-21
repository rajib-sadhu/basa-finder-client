import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ILandlordRequest } from "@/types";
import Image from "next/image";

const LandlordRequestCard = ({
  requestData,
  handleStatusChange,
}: {
  requestData: ILandlordRequest;
  handleStatusChange: (id: string, status: "approved" | "rejected") => void;
}) => {
  const {
    _id,
    name,
    status,
    message,
    paymentStatus,
    tenantPhone,
    tenantId,
    listing,
  } = requestData;

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      <div className="relative">
        <Image
          src={listing?.images[0]}
          alt="Rental Image"
          width={500}
          height={300}
          className="object-cover w-full h-60"
        />
        <Badge
          className={`absolute top-4 right-4 text-white ${
            paymentStatus === "unpaid" ? "bg-yellow-600" : "bg-green-600"
          }`}
        >
          {paymentStatus.toUpperCase()}
        </Badge>
      </div>

      <div className="p-5 space-y-3">
        <Badge
          className={` text-white ${
            status === "pending"
              ? "bg-yellow-600"
              : status === "approved"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {status.toUpperCase()}
        </Badge>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {listing?.title}
          </h2>
          <p className="text-sm text-gray-500">
            Rental ID: <span className="font-medium">{listing?.listingId}</span>
          </p>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p className="font-semibold">Tenant Details:</p>
          <p>
            <span className="font-medium">Name:</span> {name}
          </p>
          <p>
            <span className="font-medium">ID:</span> {tenantId}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {tenantPhone}
          </p>
          {message && (
            <p>
              <span className="font-medium">Message: </span>
              {`"${message}"`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {status === "pending" ? (
            <>
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleStatusChange(_id, "approved")}
              >
                APPROVE
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleStatusChange(_id, "rejected")}
              >
                REJECT
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={status === "approved" || paymentStatus === "paid"}
                className="bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50"
                onClick={() => handleStatusChange(_id, "approved")}
              >
                APPROVED
              </Button>
              <Button
                disabled={status === "rejected" || paymentStatus === "paid"}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                onClick={() => handleStatusChange(_id, "rejected")}
              >
                REJECTED
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandlordRequestCard;
