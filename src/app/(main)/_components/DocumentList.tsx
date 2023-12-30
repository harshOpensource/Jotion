"use client";

import React, { useState } from "react";
import { Id, Doc } from "../../../../convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import Item from "./Item";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

function DocumentList({
  parentDocumentId,
  level = 0,
  data,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        <Item.Skeleton level={level} />
      </>
    );
  }

  return (
    <>
      <div
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </div>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            id={document._id}
            active={params.documentId === document._id}
            level={level}
            onExpanded={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
              data={document}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default DocumentList;
