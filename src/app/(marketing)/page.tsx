import React from "react";
import Header from "./_components/Header";
import Heros from "./_components/Heros";
import Footer from "./_components/Footer";

type MerketingPageProps = {};

function MerketingPage({}: MerketingPageProps) {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 px-6 flex-1 pb-10">
        <Header />
        <Heros />
      </div>
      <Footer />
    </div>
  );
}

export default MerketingPage;
