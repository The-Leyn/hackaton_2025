import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex fixed bottom-0 bg-purple-400 w-full p-8 items-center justify-center gap-4">
      <button>
        <Link href={`/profile`}>
        
        </Link>
      </button>
      <Link href={`/profile`}>Profile</Link>
      <Link href={`/profile`}>Profile</Link>
      <Link href={`/profile`}>Profile</Link>
    </nav>
  );
}
