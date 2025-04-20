import { FieldValues } from "react-hook-form";

export const createRentals = async (rentalData: FieldValues) => {
  try {
    const res = await fetch(`http://localhost:5000/api/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllRentals = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/listings", {
      cache: "no-store",
    });

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
    return data.secure_url; // Cloudinary returns a secure https image URL
  });

  return Promise.all(uploads);
};
