"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

type Props = {};

function Header({}: Props) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <div className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Unify Your Ideas, Documents, and Plans with
        <span className="underline">Jotion</span>
      </div>
      <div className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where better and faster work happens.
      </div>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <div>
          <SignInButton mode="modal">
            <Button variant={"default"} size={"sm"}>
              Get Jotion Free!
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}

export default Header;
