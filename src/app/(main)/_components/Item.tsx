"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  onClick: () => void;
  label: string;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  expanded?: boolean;
  active?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpanded?: () => void;
};

function Item({ onClick, label, icon: Icon }: Props) {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className="group min-h-[27px] py-1 text-sm pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
    >
      <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
}

export default Item;
