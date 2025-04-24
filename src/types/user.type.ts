export interface IUser {
  userId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  role: "admin" | "landlord" | "tenant";
  _id?: string;
  isActive?: boolean;
}
