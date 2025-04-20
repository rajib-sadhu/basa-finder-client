"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache"; // ✅ Import this to use `revalidateTag`

export const createRentals = async (rentalData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    const result = await res.json();

    revalidateTag("RENTAL");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllRentals = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      cache: "no-store",
      next: {
        tags: ["RENTAL"], // ✅ Optional: tag it here if needed
      },
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyRentals = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/my-listings`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        cache: "no-store",
        next: {
          tags: ["RENTAL"], // ✅ Correct usage of tags
        },
      }
    );

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const uploadImages = async (imageFiles: File[]) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const uploads = imageFiles.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset as string);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  });

  return Promise.all(uploads);
};
