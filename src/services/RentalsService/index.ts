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
          tags: ["RENTAL"],
        },
      }
    );

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleRental = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/list/${id}`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteRental = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();
    revalidateTag("RENTAL");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateRental = async (
  id: string,
  updateRentalData: FieldValues
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRentalData),
      }
    );

    const result = await res.json();

    revalidateTag("RENTAL");

    return result;
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
