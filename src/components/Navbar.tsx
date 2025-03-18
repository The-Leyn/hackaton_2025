'use client'
import React from "react";
import Link from "next/link";
import { House, UserRound, Medal } from "lucide-react";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex fixed bottom-0 bg-hackatonWhite-400 rounded-t-2xl w-full p-4 items-center justify-around">
      <button className={`p-2 rounded-xl ${pathname === "/" ? "bg-hackatonPervenche-400" : ""}`}>
        <Link href={`/`}>
          <House className="text-hackatonPervencheDark-400" size={32} />
        </Link>
      </button>
      <button className={`p-2 rounded-xl ${pathname === "/ranking" ? "bg-hackatonPervenche-400" : ""}`}>
        <Link href={`/ranking`}>
          <Medal className="text-hackatonPervencheDark-400" size={32} />
        </Link>
      </button>
      <button className={`p-2 rounded-xl ${pathname === "/profile" ? "bg-hackatonPervenche-400" : ""}`}>
        <Link href={`/profile`}>
          <UserRound className="text-hackatonPervencheDark-400" size={32} />
        </Link>
      </button>
    </nav>
  );
}
