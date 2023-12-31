"use client";

import React, { ElementRef, useRef, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import TextareaAutozize from "react-textarea-autosize";
import { useCoverImageStore } from "@/hooks/user-cover-image";

type Props = {
  initialData: Doc<"documents">;
  preview?: boolean;
};

function Toolbar({ initialData, preview }: Props) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const update = useMutation(api.documents.update);

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onSelectIcon = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const removeIcon = useMutation(api.documents.removeIcon);

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  const coverImage = useCoverImageStore();

  return (
    <div className="pl-[54px] group relative">
      {!!initialData && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onSelectIcon}>
            <div className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </div>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
            onClick={onRemoveIcon}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData && preview && (
        <div className="text-6xl pt-6">{initialData.icon}</div>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker onChange={onSelectIcon} asChild>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover Image
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutozize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF] outline-none break-words"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}

export default Toolbar;
