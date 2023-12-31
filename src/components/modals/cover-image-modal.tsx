"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImageStore } from "@/hooks/user-cover-image";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";

type Props = {};

function CoverImageModal({}: Props) {
  const coverImage = useCoverImageStore();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();

  const update = useMutation(api.documents.update);
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });
      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader className="text-center text-lg font-semibold">
          Cover Image
        </DialogHeader>
        <div>
          <SingleImageDropzone
            className="w-full outline-none"
            value={file}
            disabled={isSubmitting}
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CoverImageModal;
