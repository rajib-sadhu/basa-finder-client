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

export interface ITenantRequest {
  _id: string;
  listingId: IRental;
  tenantId: IUser;
  landlordId: string;
  name: string;
  status: RequestStatus;
  message: string;
  paymentStatus: PaymentStatus;
  landlordPhone: string;
  tenantPhone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface IRental {
  _id: string;
  title: string;
  location: string;
  description: string;
  rent: number;
  bedrooms: number;
  amenities: string[];
  images: string[];
  landlordId: string;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type RequestStatus = "pending" | "approved" | "rejected";
type PaymentStatus = "paid" | "unpaid";
