import Image from "next/image";
import React from "react";

type Props = {};

function Heros({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Hero-light"
          />
          <Image
            src="/documents-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Hero-dark"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/reading.png"
            className="object-contain dark:hidden"
            alt="reading-light"
            fill
          />
          <Image
            src="/reading-dark.png"
            className="object-contain hidden dark:block"
            alt="reading-dark"
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default Heros;
