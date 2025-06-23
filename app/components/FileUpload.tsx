"use client"; // This component must be a client component

import {
  upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: unknown) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);

  //optional validation

  const validateFile = (file: File) => {
    if (fileType === "video") {
      const allowedTypes = ["video/mp4"];
      const allowedExts = [".mp4"];
      const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowedTypes.includes(file.type) && !allowedExts.includes(fileExt)) {
        return false;
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if(event.lengthComputable && onProgress){
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent))
          }
        },
        
      });
      onSuccess(res)
    } catch (error) {
        console.error("Upload failed", error)
    } finally {
        setUploading(false)
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? ".mp4,video/mp4" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading....</span>}
    </>
  );
};

export default FileUpload;