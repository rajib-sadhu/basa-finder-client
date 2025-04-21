export interface ILandlordRequest {
  _id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  paymentStatus: "unpaid" | "paid";
  landlordPhone?: string;
  tenantPhone?: string;
  tenantId: string;
  listing: {
    listingId: string;
    title: string;
    images: string[];
  };
}
