"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type TImageUploader = {
  setImageFiles: (files: File[]) => void;
  maxFiles?: number;
  label?: string;
  className?: string;
};

const UpdateImageUploader = ({
  setImageFiles,
  maxFiles = 5,
  label = "Please Select Multiple image at a time",
  className,
}: TImageUploader) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files).slice(0, maxFiles);
    setImageFiles(files);
    e.target.value = "";
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

export default UpdateImageUploader;