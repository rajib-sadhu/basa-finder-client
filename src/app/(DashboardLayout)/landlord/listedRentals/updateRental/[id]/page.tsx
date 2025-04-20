"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Bed,
  DollarSign,
  Home,
  Image as ImageIcon,
  MapPin,
  Text,
  Wifi,
  X,
  Loader,
} from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/core/ImageUploader";
import ImagePreviewer from "@/components/ui/core/ImageUploader/ImagePreviewer";
import {
  getSingleRental,
  updateRental,
  uploadImages,
} from "@/services/RentalsService";
import { rentalsSchema } from "@/components/modules/rental/rentalValidations";
import Image from "next/image";
import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import { z } from "zod";

// Create a modified schema for updates that accepts both URLs and Files
const updateRentalSchema = rentalsSchema.extend({
  images: z.union([z.array(z.string().url()), z.array(z.instanceof(File))]),
});

type UpdateRentalInput = z.infer<typeof updateRentalSchema>;

const UpdateRental = () => {
  const router = useRouter();
  const { id: rentalId } = useParams();

  const [loading, setLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<(string | File)[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const form = useForm<UpdateRentalInput>({
    resolver: zodResolver(updateRentalSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      rent: 0,
      bedrooms: 1,
      amenities: [],
      images: [],
    },
  });

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    setValue,
  } = form;

  const commonAmenities = [
    "Wifi",
    "Air Conditioning",
    "Heating",
    "Washer",
    "Dryer",
    "Kitchen",
    "Free Parking",
    "TV",
    "Gym",
    "Pool",
  ];

  useEffect(() => {
    return () => {
      // Clean up object URLs
      imagePreview.forEach((preview) => {
        if (typeof preview === "string" && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreview]);

  useEffect(() => {
    const fetchRental = async () => {
      if (!rentalId) return;
      try {
        const rental = await getSingleRental(rentalId as string);

        // Parse amenities if they're stored as JSON string
        const amenities = Array.isArray(rental.amenities)
          ? rental.amenities
          : JSON.parse(rental.amenities || "[]");

        // Set form values
        reset({
          title: rental.title || "",
          location: rental.location || "",
          description: rental.description || "",
          rent: rental.rent || 0,
          bedrooms: rental.bedrooms || 1,
          amenities: amenities,
          images: rental.images || [],
        });

        // Set image states
        setExistingImages(rental.images || []);
        setImagePreview(rental.images || []);
      } catch (error) {
        console.error("Error fetching rental:", error);
        toast.error("Failed to fetch rental data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [rentalId, reset]);

  const onSubmit = async (data: UpdateRentalInput) => {
    const toastID = toast.loading("Updating rental...");
    try {
      // Separate existing URLs and new files
      const existingImageUrls = existingImages;
      let newImageUrls: string[] = [];

      // Upload new images if any
      if (imageFiles.length > 0) {
        newImageUrls = await uploadImages(imageFiles);
      }

      // Combine all image URLs
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      const updatedData = {
        ...data,
        // amenities: JSON.stringify(data.amenities),
        images: allImageUrls,
      };

      const res = await updateRental(rentalId as string, updatedData);
      if (res?.status) {
        toast.success("Rental updated successfully!", { id: toastID });
        router.push("/landlord/listedRentals");
      } else {
        toast.error(res?.message || "Failed to update listing", {
          id: toastID,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("An error occurred. Please try again.", { id: toastID });
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    const newExistingImages = existingImages.filter((img) => img !== imageUrl);
    setExistingImages(newExistingImages);
    setImagePreview([
      ...newExistingImages,
      ...imagePreview.filter(
        (img) => typeof img !== "string" || !existingImages.includes(img)
      ),
    ]);
    setValue(
      "images",
      [
        ...newExistingImages,
        ...imageFiles.filter(
          (_, index) =>
            typeof imagePreview[index + existingImages.length] !== "string"
        ),
      ],
      { shouldValidate: true }
    );
  };
  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <HeaderPath role="Landlord" subPath="Update Rental" />

      <div className="px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Home className="w-5 h-5" /> Update Rental Listing
          </h1>
          <Link href="/landlord/listedRentals">
            <Button className="flex items-center gap-2 bg-emerald-800">
              <ArrowLeft className="w-4 h-4" /> Back to My Listings
            </Button>
          </Link>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            <h3 className="font-bold mb-2">Please fix these errors:</h3>
            {Object.entries(errors).map(([key, error]) => (
              <p key={key}>{error.message}</p>
            ))}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Text className="w-4 h-4" /> Property Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Modern 2-Bedroom Apartment in Downtown"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Full Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, State, ZIP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your property in detail (features, neighborhood, etc.)"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rent and Bedrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="rent"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Monthly Rent ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1500"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="bedrooms"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Bed className="w-4 h-4" /> Bedrooms
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Amenities */}
            <FormField
              name="amenities"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Wifi className="w-4 h-4" /> Amenities
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!field.value.includes(value)) {
                        field.onChange([...field.value, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amenities" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {commonAmenities.map((amenity) => (
                        <SelectItem key={amenity} value={amenity}>
                          {amenity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value?.map((amenity: string) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(
                              field.value.filter((a: string) => a !== amenity)
                            )
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Property Images
              </FormLabel>
              <div className="text-sm text-muted-foreground">
                {existingImages.length > 0
                  ? "Upload new images to add to existing ones, or remove existing images below"
                  : "Upload at least one image (max 5)"}
              </div>
              <div className="mt-2 flex flex-wrap gap-5">
                <ImageUploader
                  setImageFiles={(files) => {
                    setImageFiles((prevFiles) => [...prevFiles, ...files]);
                  }}
                  setImagePreview={(newPreviews) => {
                    setImagePreview((prev) => [...prev, ...newPreviews]);
                  }}
                  label="Upload New Images"
                  maxFiles={5 - existingImages.length}
                />

                {/* Existing images with remove option */}
                {existingImages.length > 0 && (
                  <div className="w-full">
                    <h4 className="text-sm font-medium mb-2">
                      Existing Images
                    </h4>
                    <div className="flex flex-wrap gap-5">
                      {existingImages.map((imageUrl) => (
                        <div key={imageUrl} className="relative group">
                          <Image
                            src={imageUrl}
                            alt="Property"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(imageUrl)}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New image previews */}
                {imagePreview.length > existingImages.length && (
                  <div className="w-full">
                    <h4 className="text-sm font-medium mb-2">New Images</h4>
                    <ImagePreviewer
                      setImageFiles={setImageFiles}
                      setImagePreview={(newPreviews) => {
                        setImagePreview([...existingImages, ...newPreviews]);
                      }}
                      imagePreview={imagePreview.filter(
                        (img) => !existingImages.includes(img)
                      )}
                      className="flex gap-5 flex-wrap justify-start"
                    />
                  </div>
                )}
              </div>
            </FormItem>

            <Button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" /> Updating...
                </span>
              ) : (
                "Update Listing"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UpdateRental;
