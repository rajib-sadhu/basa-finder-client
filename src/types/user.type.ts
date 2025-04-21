export interface IUser {
  userId: string;
  name?: string;
  email: string;
  phoneNumber: string;
  role: string;
  iat: number;
  exp: number;
  _id?: string;
  isActive?: boolean;
}
