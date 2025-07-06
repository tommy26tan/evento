"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) {
      return;
    }
    router.push(`/events/${searchText.trim()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px] ">
      <input
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition-smooth text-white placeholder:text-white/50 focus:ring-2 focus:bg-white/10"
        type="text"
        value={searchText}
        placeholder="Search events in any city"
        spellCheck={false}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
