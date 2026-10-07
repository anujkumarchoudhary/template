"use client";

// import { blogImageBaseUrl } from "@/app/baseUrl";
import Image from "next/image";

import { useRef, useState, useEffect } from "react";

export default function ImageUpload({
  onUpload,
  existingImage,
}: {
  onUpload: (file: File) => void;
  existingImage?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ✅ Prefill image in edit mode
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl); // show new preview
    onUpload(file); // send file to parent
  };

  // ✅ Cleanup only for blob URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const imageSrc = preview
    ? preview.startsWith("blob:")
      ? preview
      : `${"blogImageBaseUrl"}${preview}`
    : null;

  return (
    <div className="relative bg-[#F8F8F8] rounded-xl p-4">
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleChange}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className="relative cursor-pointer h-40 w-full border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center hover:border-black transition overflow-hidden"
      >
        {preview ? (
          <Image
            src={imageSrc ?? ""}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="text-gray-500 text-sm">Upload</span>
        )}
      </div>
    </div>
  );
}
