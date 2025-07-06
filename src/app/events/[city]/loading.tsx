import SkelectonCard from "@/components/skeleton-card";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center flex-wrap max-w-[1100px] mx-auto px-[20px] py-24 gap-20">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkelectonCard key={index} />
      ))}
    </div>
  );
}
