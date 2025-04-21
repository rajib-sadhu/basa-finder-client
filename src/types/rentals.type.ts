export interface IRental {
    _id: string;
    title: string;
    location: string;
    description: string;
    rent: number;
    bedrooms: number;
    amenities: string[];
    images: string[];
    availability: boolean;
    landlordId: string; // assuming it's a string representation of ObjectId
    createdAt: string; // or Date, depending on how you handle it
    updatedAt: string; // or Date
    __v?: number;
  }
  