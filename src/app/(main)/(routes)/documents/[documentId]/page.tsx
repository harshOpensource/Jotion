"use client";

import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Toolbar from "@/components/Toolbar";

type Props = {
  params: {
    documentId: Id<"documents">;
  };
};

function page({ params }: Props) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <div>loading...</div>;
  }
  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}

export default page;
