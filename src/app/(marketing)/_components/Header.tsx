"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";

type Props = {};

function Header({}: Props) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </div>
      <div className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where better, faster work happens.
      </div>
      <Button>
        Enter Jotion
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}

export default Header;
