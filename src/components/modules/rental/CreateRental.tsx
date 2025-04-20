"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Home,
  MapPin,
  Text,
  DollarSign,
  Bed,
  Wifi,
  Image as ImageIcon,
  X,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createRentals, uploadImages } from "@/services/RentalsService";
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
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { rentalsSchema } from "./rentalValidations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ImageUploader from "@/components/ui/core/ImageUploader";
import ImagePreviewer from "@/components/ui/core/ImageUploader/ImagePreviewer";
import { useUser } from "@/context/UserContext";

const CreateRental = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(rentalsSchema),
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastUploadID = toast.loading("Image uploading...");

    try {
      const imageUrls = await uploadImages(imageFiles);

      toast.success("Image upload done!", { id: toastUploadID });

      const toastListID = toast.loading("Rental listing...");
      const rentalData = {
        ...data,
        landlordId: user!._id,
        amenities: JSON.stringify(data.amenities),
        images: imageUrls,
      };

      const res = await createRentals(rentalData);

      if (res?.status) {
        toast.success("Rental listing created successfully!", {
          id: toastListID,
        });
        router.push("/landlord/listedRentals");
      } else {
        toast.error(res?.message || "Failed to create listing", {
          id: toastListID,
        });
      }
    } catch (err: any) {
      toast.error("An error occurred. Please try again.", {
        id: toastUploadID,
      });
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Home className="w-5 h-5" /> Create New Rental Listing
        </h1>
        <Link href="/landlord/listedRentals">
          <Button
            variant="default"
            className="flex items-center gap-2 bg-emerald-800 cursor-pointer"
          >
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
          <FormField
            control={form.control}
            name="title"
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

          <FormField
            control={form.control}
            name="location"
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

          <FormField
            control={form.control}
            name="description"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="rent"
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
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Bed className="w-4 h-4" /> Number of Bedrooms
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" /> Amenities
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (!field.value!.includes(value)) {
                      field.onChange([...field.value!, value]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
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
                        onClick={() => {
                          field.onChange(
                            field.value!.filter((a: string) => a !== amenity)
                          );
                        }}
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

          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Property Images
            </FormLabel>
            <div className="text-sm text-muted-foreground">
              Upload at least one image (max 5)
            </div>

            <div className="mt-2 flex flex-wrap gap-5">
              <ImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Images"
              />
              {imagePreview.length > 0 && (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                  className="flex gap-5 flex-wrap justify-start"
                />
              )}
            </div>
          </FormItem>

          <Button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRental;
