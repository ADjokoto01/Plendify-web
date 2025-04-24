import { useGetShop, useUploadFile } from "@/features/supplier/hooks";

import React from "react";
import { toast } from "react-toastify";
import { Button } from "../ui";
import { useBatchSignedUrl } from "@/features";
import { Avatar } from "../avatar";

export const FileUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }
  const { data: shop } = useGetShop();

  const { mutateAsync, isPending } = useUploadFile();
  const { mutate: mutateBatchSignedUrl, isPending: isBatchSignedUrlPending } =
    useBatchSignedUrl();

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  async function handleFileUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);
    formData.append("folder", "shops/logo");
    formData.append("fileType", "image");
    formData.append("referenceId", shop?.shop?.id || "");
    formData.append("referenceType", "shop");

    try {
      await mutateAsync(formData, {
        onSuccess: (data) => {
          mutateBatchSignedUrl(data.data.files.map((item: any) => item.key));
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={handleAvatarClick}
        className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:opacity-80 flex items-center justify-center bg-gray-100"
      >
        {preview ? (
          <Avatar size="sm" src={preview} alt="Avatar preview" />
        ) : (
          <Avatar size="sm" />
        )}
      </div>

      <Button
        size="sm"
        className="rounded-none"
        disabled={isPending || isBatchSignedUrlPending}
        onClick={handleFileUpload}
      >
        {isPending ? "uploading..." : "Upload Shop logo"}
      </Button>
    </div>
  );
};
