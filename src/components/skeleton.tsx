import { cn } from "@/lib/util";
import React from "react";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse h-4 w-[500px] rounded-md bg-white/5",
        className
      )}
    ></div>
  );
}
