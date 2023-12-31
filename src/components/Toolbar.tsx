"use client";

import React from "react";
import { Doc } from "../../convex/_generated/dataModel";

type Props = {
  initialData: Doc<"documents">;
  preview?: boolean;
};

function Toolbar({ initialData, preview }: Props) {
  return <div>Toolbar</div>;
}

export default Toolbar;
