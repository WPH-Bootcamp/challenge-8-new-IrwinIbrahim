"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movie..."
        className="
          w-44 px-3 py-1.5
          rounded-full
          bg-black/60 border border-gray-600
          text-sm text-white
          outline-none
        "
      />
    </form>
  );
}
