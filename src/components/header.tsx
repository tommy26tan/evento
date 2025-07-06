"use client";

import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/util";

const routes = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events/all" },
];

export default function Header() {
  const activePathName = usePathname();
  return (
    <header className="flex justify-between items-center px-3 md:px-9 border-b border-white/10 h-14">
      <Logo />
      <nav className="h-full">
        <ul className="flex gap-x-6 h-full text-sm">
          {routes.map((route) => (
            <li
              key={route.name}
              className={cn(
                " hover:text-white flex items-center relative transition-colors",
                {
                  "text-white font-semibold": activePathName === route.path,
                  "text-white/50": activePathName !== route.path,
                }
              )}
            >
              <Link href={route.path}>{route.name}</Link>
              {activePathName === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
