import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

type Props = {};

function Logo({}: Props) {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        width={40}
        height={40}
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        width={40}
        height={40}
        alt="logo-dark"
        className="hidden dark:block"
      />

      <div className={cn("font-bold", font.className)}>Jotion</div>
    </div>
  );
}

export default Logo;
