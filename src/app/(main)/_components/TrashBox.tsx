"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

type Props = {};

function TrashBox({}: Props) {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState<string>("");

  const filteredDocuments = documents?.filter((document) =>
    document.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: docId });
    toast.promise(promise, {
      loading: "Restoring note",
      success: "Note restored",
      error: "Failed to restore note",
    });
  };

  const onRemove = async (docId: Id<"documents">) => {
    const promise = remove({ id: docId });
    toast.promise(promise, {
      loading: "Removing note",
      success: "Note removed",
      error: "Failed to remove note",
    });
    if (params.documentId === docId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full w-72 flex items-center p-4">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
          <Search className="h-4 w-4" />
          <Input
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="Filter by page title..."
          />
        </div>
        <div className="mt-2 px-1 pb-1">
          <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            No documents found.
          </p>
          {filteredDocuments?.map((document) => (
            <div
              key={document._id}
              role="button"
              onClick={() => onClick(document._id)}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            >
              <span className="truncate pl-2">{document.title}</span>
              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, document._id)}
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => onRemove(document._id)}>
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrashBox;
