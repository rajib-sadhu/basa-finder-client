"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: (files: File[]) => void;
  setImagePreview: (previews: string[]) => void;
  maxFiles?: number;
};

const ImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
  maxFiles = 5,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files).slice(0, maxFiles);
    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    // Process each file to create previews
    files.forEach((file) => {
      newFiles.push(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        
        // When all files are processed, update the previews
        if (newPreviews.length === files.length) {
          setImagePreview(newPreviews);
        }
      };

      reader.readAsDataURL(file);
    });

    // Update the files state immediately
    setImageFiles(newFiles);
    event.target.value = "";
  };

  return (
    <div className={cn("", className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        <ImageIcon className="w-6 h-6 mb-2 text-gray-400" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default ImageUploader;