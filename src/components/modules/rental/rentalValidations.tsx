import { z } from "zod";

// Simplified image schema that only handles File objects
const imageFileSchema = z.instanceof(File)
  .refine(
    file => file.size <= 5 * 1024 * 1024, // 5MB max
    "Image must be smaller than 5MB"
  )
  .refine(
    file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    "Only .jpg, .png, and .webp formats are supported"
  );

export const rentalsSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  })
  .min(5, "Title must be at least 5 characters")
  .max(100, "Title cannot exceed 100 characters"),

  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location must be a string",
  })
  .min(5, "Location must be at least 5 characters")
  .max(200, "Location cannot exceed 200 characters"),

  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  })
  .min(20, "Description must be at least 20 characters")
  .max(2000, "Description cannot exceed 2000 characters"),

  rent: z.number({
    required_error: "Rent amount is required",
    invalid_type_error: "Rent must be a number",
  })
  .positive("Rent must be a positive number")
  .min(1, "Rent must be at least $1"),

  bedrooms: z.number({
    required_error: "Number of bedrooms is required",
    invalid_type_error: "Bedrooms must be a number",
  })
  .int("Bedrooms must be an integer")
  .min(1, "At least 1 bedroom is required")
  .max(20, "Cannot exceed 20 bedrooms"),

  amenities: z.array(
    z.string({
      invalid_type_error: "Each amenity must be a string",
    })
  )
  .optional(),

  // Now only accepts File objects
  images: z.array(z.instanceof(File))
   
});

// Type for TypeScript usage
export type RentalsInput = z.infer<typeof rentalsSchema>;