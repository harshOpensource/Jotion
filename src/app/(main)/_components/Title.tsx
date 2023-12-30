"use client";

import React, { useRef, useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  initialData: Doc<"documents">;
};

function Title({ initialData }: Props) {
  const update = useMutation(api.documents.update);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(initialData.title || "Untitled");

  const enableInput = () => {
    setIsEditing(true);
    setTitle(initialData.title);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <div>{initialData.icon}</div>}
      {isEditing ? (
        <>
          <Input
            ref={inputRef}
            onChange={onChange}
            onBlur={disableInput}
            onClick={enableInput}
            onKeyDown={onKeyDown}
            value={title}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        </>
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          size={"sm"}
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
}

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16 rounded-md" />;
};
