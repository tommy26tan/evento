import { cn } from "@/lib/util";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function H1({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <h1
      className={cn("text-3xl lg:text-6xl font-bold tracking-tight", className)}
    >
      {title}
    </h1>
  );
}
