"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

type Props = {};

function DocumentPage({}: Props) {
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreate = async () => {
    const promise = create({
      title: "Untitled",
    });
    toast.promise(promise, {
      loading: "Creating a new note",
      success: "New note created",
      error: "Failed to create a note",
    });
  };
  return (
    <div className="h-screen flex-col flex items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="empty-dark"
        className="hidden dark:block"
      />
      <div className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion!
      </div>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}

export default DocumentPage;
