"use client";

import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

type Props = {
  documentId: Id<"documents">;
};

function Banner({ documentId }: Props) {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const hadleRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing document...",
      success: "Document removed",
      error: "Error removing document",
    });
    router.push("/documents");
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Error restoring document",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <div>This page is in the Trash</div>
      <Button
        size={"sm"}
        onClick={handleRestore}
        variant={"outline"}
        className="border-white bg-transparent text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={hadleRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
}

export default Banner;
