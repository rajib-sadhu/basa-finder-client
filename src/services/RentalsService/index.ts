import { FieldValues } from "react-hook-form";

export const createRentals = async (rentalData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings/`, {
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

export const uploadImages = async (imageFiles: File[]) => {
  const apiKey = process.env.NEXT_PUBLIC_Image_Upload_Token;

  const uploads = imageFiles.map(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data?.url;
  });

  // Wait for all images to upload and return the URLs
  return Promise.all(uploads);
};
