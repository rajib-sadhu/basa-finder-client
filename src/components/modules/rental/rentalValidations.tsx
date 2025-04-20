import { z } from "zod";

// Base schema that contains all common fields
const baseRentalSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    })
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location cannot exceed 200 characters"),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  rent: z
    .number({
      required_error: "Rent amount is required",
      invalid_type_error: "Rent must be a number",
    })
    .positive("Rent must be a positive number")
    .min(1, "Rent must be at least $1"),

  bedrooms: z
    .number({
      required_error: "Number of bedrooms is required",
      invalid_type_error: "Bedrooms must be a number",
    })
    .int("Bedrooms must be an integer")
    .min(1, "At least 1 bedroom is required")
    .max(20, "Cannot exceed 20 bedrooms"),

  amenities: z
    .array(
      z.string({
        invalid_type_error: "Each amenity must be a string",
      })
    )
    .optional(),
});

// Schema for creation (requires Files)
export const rentalsSchema = baseRentalSchema.extend({
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
});

// Schema for updates (accepts both URLs and Files)
export const updateRentalSchema = baseRentalSchema.extend({
  images: z.union([
    z.array(z.string().url()),
    z.array(z.instanceof(File)),
  ])
  .refine(
    (images) => images.length > 0,
    "At least one image is required"
  )
  .refine(
    (images) => images.length <= 5,
    "Maximum 5 images allowed"
  ),
});

// Type for TypeScript usage
export type RentalsInput = z.infer<typeof rentalsSchema>;
export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;

// Helper type for the API response data
export interface RentalData extends Omit<RentalsInput, 'images' | 'amenities'> {
  _id: string;
  images: string[];
  amenities: string[] | string;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
}