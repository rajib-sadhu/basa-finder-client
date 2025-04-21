import { z } from "zod";

const baseRentalSchema = z.object({
  title: z.string().min(5).max(100),
  location: z.string().min(5).max(200),
  description: z.string().min(20).max(2000),
  rent: z.number().positive().min(1),
  bedrooms: z.number().int().min(1).max(20),
  amenities: z.array(z.string()).optional(),
});

export const rentalsSchema = baseRentalSchema.extend({
  images: z.array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
});

export const updateRentalSchema = baseRentalSchema.extend({
  images: z.array(z.string().url())
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
});

export type RentalsInput = z.infer<typeof rentalsSchema>;
export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;